from flask import Blueprint, jsonify, request
from app.services.AdminAlgoritmos import AdminAlgoritmos

controlador_algoritmos_bp = Blueprint('controlador_algoritmos', __name__)


def _obtener_texto():
    data = request.get_json(silent=True) or {}
    texto = data.get('texto')
    if not isinstance(texto, str):
        return None, jsonify({"error": "El campo 'texto' debe ser un string"}), 400
    if not texto.strip():
        return None, jsonify({"error": "El texto no puede estar vacío"}), 400
    return texto, None, None


# ── Huffman ──────────────────────────────────────────────────────────────────
@controlador_algoritmos_bp.route('/huffman', methods=['POST'])
def endpoint_huffman():
    texto, error_response, error_code = _obtener_texto()
    if error_response:
        return error_response, error_code
    return jsonify(AdminAlgoritmos.huffman(texto))


# ── Shannon-Fano ──────────────────────────────────────────────────────────────
@controlador_algoritmos_bp.route('/shannon-fano', methods=['POST'])
def endpoint_shannon_fano():
    texto, error_response, error_code = _obtener_texto()
    if error_response:
        return error_response, error_code
    return jsonify(AdminAlgoritmos.shannon_fano(texto))


# ── Hamming ───────────────────────────────────────────────────────────────────
@controlador_algoritmos_bp.route('/hamming', methods=['POST'])
def endpoint_hamming():
    texto, error_response, error_code = _obtener_texto()
    if error_response:
        return error_response, error_code
    return jsonify(AdminAlgoritmos.hamming(texto))


@controlador_algoritmos_bp.route('/hamming/codificar', methods=['POST'])
def endpoint_hamming_codificar():
    """Recibe 4 bits de datos y devuelve el código Hamming(7,4) de 7 bits."""
    data = request.get_json(silent=True) or {}
    bits_str = data.get('bits', '')
    if not isinstance(bits_str, str) or not all(b in '01' for b in bits_str):
        return jsonify({"error": "El campo 'bits' debe contener solo 0 y 1"}), 400
    if len(bits_str) != 4:
        return jsonify({"error": "Se esperan exactamente 4 bits de datos"}), 400
    resultado = AdminAlgoritmos.hamming_codificar_bits(list(map(int, bits_str)))
    return jsonify(resultado)


@controlador_algoritmos_bp.route('/hamming/decodificar', methods=['POST'])
def endpoint_hamming_decodificar():
    """Recibe 7 bits Hamming(7,4) y devuelve los 4 bits de datos corregidos."""
    data = request.get_json(silent=True) or {}
    bits_str = data.get('bits', '')
    if not isinstance(bits_str, str) or not all(b in '01' for b in bits_str):
        return jsonify({"error": "El campo 'bits' debe contener solo 0 y 1"}), 400
    if len(bits_str) != 7:
        return jsonify({"error": "Se esperan exactamente 7 bits (código Hamming(7,4))"}), 400
    resultado = AdminAlgoritmos.hamming_decodificar_bits(list(map(int, bits_str)))
    return jsonify(resultado)


# ── Comprimir (Huffman + Shannon-Fano combinados) ────────────────────────────
@controlador_algoritmos_bp.route('/comprimir', methods=['POST'])
def endpoint_comprimir():
    """Ejecuta Huffman y Shannon-Fano sobre el mismo texto y devuelve ambos
    resultados normalizados junto con el algoritmo ganador por eficiencia."""
    texto, error_response, error_code = _obtener_texto()
    if error_response:
        return error_response, error_code

    res_h = AdminAlgoritmos.huffman(texto)
    res_sf = AdminAlgoritmos.shannon_fano(texto)

    def _normalizar(res):
        """Convierte la respuesta interna de AdminAlgoritmos al formato del frontend."""
        return {
            "codigo":            res.get("texto_comprimido", ""),
            "tasa":              round(res.get("tasa_compresion", 0) / 100, 4),
            "longitud_promedio": round(res.get("longitud_promedio_codigo", 0), 4),
            "eficiencia":        round(res.get("eficiencia", 0) / 100, 4),
        }

    huffman_norm = _normalizar(res_h)
    shannon_norm = _normalizar(res_sf)

    ef_h = huffman_norm["eficiencia"]
    ef_sf = shannon_norm["eficiencia"]
    if ef_h > ef_sf:
        ganador = "huffman"
    elif ef_sf > ef_h:
        ganador = "shannon_fano"
    else:
        ganador = "empate"

    return jsonify({
        "huffman":      huffman_norm,
        "shannon_fano": shannon_norm,
        "ganador":      ganador,
    })


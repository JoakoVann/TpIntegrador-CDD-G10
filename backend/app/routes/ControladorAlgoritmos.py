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


@controlador_algoritmos_bp.route('/huffman', methods=['POST'])
def endpoint_huffman():
    texto, error_response, error_code = _obtener_texto()
    if error_response:
        return error_response, error_code

    resultado = AdminAlgoritmos.huffman(texto)
    return jsonify(resultado)


@controlador_algoritmos_bp.route('/shannon-fano', methods=['POST'])
def endpoint_shannon_fano():
    texto, error_response, error_code = _obtener_texto()
    if error_response:
        return error_response, error_code

    resultado = AdminAlgoritmos.shannon_fano(texto)
    return jsonify(resultado)


@controlador_algoritmos_bp.route('/hamming', methods=['POST'])
def endpoint_hamming():
    texto, error_response, error_code = _obtener_texto()
    if error_response:
        return error_response, error_code

    resultado = AdminAlgoritmos.hamming(texto)
    return jsonify(resultado)

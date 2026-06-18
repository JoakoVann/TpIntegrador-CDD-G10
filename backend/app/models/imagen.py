from app import db
from datetime import datetime

class Imagen(db.Model):
    __tablename__ = 'imagenes'

    id_imagen = db.Column(db.String(36), primary_key=True)
    ruta = db.Column(db.String(255), nullable=False)
    fecha_subida = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id_imagen": self.id_imagen,
            "ruta": self.ruta,
            "fecha_subida": self.fecha_subida.isoformat() if self.fecha_subida else None
        }
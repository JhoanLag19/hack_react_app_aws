from flask import Blueprint, request, jsonify
from .models import db, Usuario
import os

api = Blueprint('api', __name__)

@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{
        'id': usuario.id,
        'nombre': usuario.nombre if len(usuario.nombre) <= 10 else usuario.nombre[:10] + '...',
        'correo': usuario.correo,
        'edad': usuario.edad
    } for usuario in usuarios])

@api.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    return jsonify({
        'id': usuario.id,
        'nombre': usuario.nombre,
        'correo': usuario.correo,
        'edad': usuario.edad        
    })

@api.route('/usuarios', methods=['POST'])
def create_user():
    data = request.json
    new_usuario = Usuario(nombre=data['nombre'], correo=data['correo'], edad=data['edad'])
    db.session.add(new_usuario)
    db.session.commit()
    return jsonify({'id': new_usuario.id, 'nombre': new_usuario.nombre, 'correo': new_usuario.correo, 'edad': new_usuario.edad}), 201

@api.route('/usuarios/<int:id>', methods=['PUT'])
def update_usuario(id):
    data = request.json
    usuario = Usuario.query.get_or_404(id)
    usuario.nombre = data['nombre']
    usuario.correo = data['correo']
    usuario.edad = data['edad']
    db.session.commit()
    return jsonify({'id': usuario.id, 'nombre': usuario.nombre, 'correo': usuario.correo, 'edad': usuario.edad})

@api.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    db.session.delete(usuario)
    db.session.commit()
    return '', 204

# Ruta para el conteo de usuarios

@api.route('/usuarios/count', methods=['GET'])
def count_usuarios():
    count = Usuario.query.count()
    return jsonify({'total_usuarios': count})

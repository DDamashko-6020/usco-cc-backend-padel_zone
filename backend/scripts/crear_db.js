'use strict';

/**
 * Crea la BD de pruebas club_deportivo (colecciones + validadores + índices).
 * No hace drop ni inserta documentos (sin seed).
 * Idempotente: si la colección ya existe, no la modifica.
 */
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/club_deportivo';

const oid = { bsonType: 'objectId' };
const str = { bsonType: 'string' };
const num = { bsonType: ['double', 'int', 'long', 'decimal'] };
const bool = { bsonType: 'bool' };
const date = { bsonType: 'date' };
const int = { bsonType: ['int', 'long'] };

const collections = [
  {
    name: 'usuarios',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['nombre', 'email', 'password_hash', 'rol'],
        additionalProperties: false,
        properties: {
          _id: oid,
          nombre: str,
          email: str,
          password_hash: str,
          rol: { enum: ['cliente', 'profesor', 'admin'] },
          telefono: str,
          cargo: str,
          foto_url: str,
          fecha_registro: date,
        },
      },
    },
    indexes: [
      { key: { email: 1 }, unique: true, name: 'email_unique' },
      { key: { rol: 1 }, name: 'rol_idx' },
    ],
  },
  {
    name: 'canchas',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['nombre', 'tipo', 'precio_por_hora', 'disponible'],
        additionalProperties: false,
        properties: {
          _id: oid,
          nombre: str,
          tipo: str,
          precio_por_hora: num,
          disponible: bool,
          descripcion: str,
          imagen_url: str,
          caracteristicas: { bsonType: 'array', items: str },
        },
      },
    },
    indexes: [{ key: { nombre: 1 }, name: 'nombre_idx' }],
  },
  {
    name: 'clases',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['nombre', 'profesor_id', 'rango_edad', 'cupo_maximo', 'precio'],
        additionalProperties: false,
        properties: {
          _id: oid,
          nombre: str,
          descripcion: str,
          tipo: str,
          profesor_id: oid,
          rango_edad: str,
          cupo_maximo: int,
          precio: num,
          duracion_clase: num,
          horas_semana: num,
          dias_semana: str,
          color: str,
          imagen_url: str,
          horarios: { bsonType: 'array', items: str },
        },
      },
    },
    indexes: [
      { key: { profesor_id: 1 }, name: 'profesor_idx' },
      { key: { nombre: 1, rango_edad: 1 }, name: 'nombre_rango_idx' },
    ],
  },
  {
    name: 'reservas',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['usuario_id', 'tipo', 'estado', 'precio'],
        additionalProperties: false,
        properties: {
          _id: oid,
          usuario_id: oid,
          tipo: { enum: ['cancha', 'clase'] },
          cancha_id: oid,
          clase_id: oid,
          fecha: str,
          hora_inicio: str,
          hora_fin: str,
          horario: str,
          estado: { enum: ['pendiente', 'confirmada', 'cancelada'] },
          precio: num,
          fecha_creacion: date,
        },
      },
    },
    indexes: [
      { key: { usuario_id: 1 }, name: 'usuario_idx' },
      { key: { cancha_id: 1, fecha: 1 }, name: 'cancha_fecha_idx' },
      { key: { clase_id: 1, estado: 1 }, name: 'clase_estado_idx' },
    ],
  },
  {
    name: 'torneos',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['nombre', 'fecha', 'fecha_fin', 'precio_inscripcion', 'cupo_maximo_parejas'],
        additionalProperties: false,
        properties: {
          _id: oid,
          nombre: str,
          descripcion: str,
          fecha: str,
          fecha_fin: str,
          categoria: str,
          nivel: str,
          lugar: str,
          precio_inscripcion: num,
          cupo_maximo_parejas: int,
          premio: str,
          imagen_url: str,
        },
      },
    },
    indexes: [{ key: { fecha: 1 }, name: 'fecha_idx' }],
  },
  {
    name: 'participantes',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['torneo_id', 'usuario_id', 'pareja_id', 'pago_confirmado'],
        additionalProperties: false,
        properties: {
          _id: oid,
          torneo_id: oid,
          usuario_id: oid,
          pareja_id: oid,
          nivel: str,
          telefono: str,
          pago_confirmado: bool,
          fecha_inscripcion: date,
        },
      },
    },
    indexes: [
      { key: { torneo_id: 1, usuario_id: 1 }, unique: true, name: 'torneo_usuario_unique' },
      { key: { usuario_id: 1 }, name: 'usuario_idx' },
    ],
  },
  {
    name: 'productos',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['nombre', 'precio', 'stock'],
        additionalProperties: false,
        properties: {
          _id: oid,
          nombre: str,
          descripcion: str,
          precio: num,
          stock: int,
          imagen_url: str,
          badge: str,
          badge_color: str,
        },
      },
    },
    indexes: [{ key: { nombre: 1 }, name: 'nombre_idx' }],
  },
  {
    name: 'pedidos',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['usuario_id', 'estado', 'subtotal', 'envio', 'total'],
        additionalProperties: false,
        properties: {
          _id: oid,
          usuario_id: oid,
          estado: { enum: ['pendiente', 'pagado', 'cancelado'] },
          subtotal: num,
          envio: num,
          total: num,
          metodo_pago: str,
          fecha_creacion: date,
        },
      },
    },
    indexes: [
      { key: { usuario_id: 1 }, name: 'usuario_idx' },
      { key: { estado: 1 }, name: 'estado_idx' },
    ],
  },
  {
    name: 'pedido_items',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['pedido_id', 'producto_id', 'cantidad', 'nombre', 'precio'],
        additionalProperties: false,
        properties: {
          _id: oid,
          pedido_id: oid,
          producto_id: oid,
          cantidad: int,
          nombre: str,
          precio: num,
        },
      },
    },
    indexes: [{ key: { pedido_id: 1 }, name: 'pedido_idx' }],
  },
  {
    name: 'domicilio',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['pedido_id', 'nombre', 'email', 'telefono', 'direccion'],
        additionalProperties: false,
        properties: {
          _id: oid,
          pedido_id: oid,
          nombre: str,
          email: str,
          telefono: str,
          direccion: str,
        },
      },
    },
    indexes: [{ key: { pedido_id: 1 }, unique: true, name: 'pedido_id_unique' }],
  },
  {
    name: 'factura',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['pedido_id', 'total', 'fecha'],
        additionalProperties: false,
        properties: {
          _id: oid,
          pedido_id: oid,
          numero: str,
          total: num,
          fecha: date,
          estado: str,
        },
      },
    },
    indexes: [{ key: { pedido_id: 1 }, unique: true, name: 'pedido_id_unique' }],
  },
];

async function main() {
  const client = new MongoClient(URI);
  await client.connect();
  const db = client.db();
  console.log('DB:', db.databaseName);

  const existing = new Set((await db.listCollections().toArray()).map((c) => c.name));

  for (const spec of collections) {
    try {
      if (existing.has(spec.name)) {
        console.log('existe:', spec.name);
        continue;
      }
      await db.createCollection(spec.name, {
        validator: spec.validator,
        validationLevel: 'strict',
        validationAction: 'error',
      });
      if (spec.indexes?.length) {
        await db.collection(spec.name).createIndexes(spec.indexes);
      }
      console.log('creada:', spec.name);
    } catch (err) {
      console.error('error', spec.name, err.message);
    }
  }

  const infos = await db.listCollections().toArray();
  console.log('listCollections:', infos.map((c) => c.name).join(', '));
  await client.close();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

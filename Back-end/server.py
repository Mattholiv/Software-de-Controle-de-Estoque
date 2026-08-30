from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
    )
    """)
    conn.close()

init_db()

@app.route("/products", methods=["GET"])
def get_products():
    conn = get_db()
    products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    return jsonify([dict(p) for p in products])

@app.route("/products", methods=["POST"])
def add_product():
    data = request.json
    conn = get_db()
    conn.execute(
        "INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)",
        (data["name"], data["quantity"], data["price"])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Produto adicionado"}), 201

@app.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    conn = get_db()
    conn.execute("DELETE FROM products WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Produto removido"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
const db = require('../../config/db');

const Base = {
    init({ table }) {
        if (!table) throw new Error('Invalid Params!');
        this.table = table;

        return this;
    },
    async findOne(filters) {
        let query = `SELECT * FROM ${this.table}`;

        Object.keys(filters).map(key => {
            // WHERE | OR
            query = `
            ${query}
            ${key}
            `;

            Object.keys(filters[key]).map(field => {
                query = `
                ${query} ${field} = '${filters[key][field]}'
                `;
            });
        });

        const results = await db.query(query);
        return results.rows[0];
    },
    async create(fields) {
        try {
            let keys = [],
                values = [];

            Object.keys(fields).map(key => {
                keys.push(key);
                values.push(fields[key]);
            });

            const query = `
            INSERT INTO ${this.table} (${keys.join(',')})
            VALUES (${values.join(',')})
            RETURNING id
            `;

            const results = await db.query(query);
            return results.rows[0].id;
        } catch (err) {
            console.error(err);
        }
    },
    update(id, fields) {
        try {
            let update = [];

            Object.keys(fields).map(key => {
                const line = `${key} = '${fields[key]}'`;
                update.push(line);
            });

            const query = `
            UPDATE ${this.table} SET
            ${update.join(',')}
            WHERE id = ${id}
            `;

            return db.query(query);
        } catch (err) {
            console.error(err);
        }
    },
    delete(id) {
        return db.query(`DELETE FROM ${this.table} WHERE id = ${id}`)
    }
}

module.exports = Base;
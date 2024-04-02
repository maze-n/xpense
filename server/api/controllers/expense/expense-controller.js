import { cosmos } from "../../../db/index.js";

const database = cosmos.database('xpense');
const container = database.container('expenses');

export async function listExpenses(req, res, next) {
    const querySpec = { query: "SELECT * FROM expenses c ORDER BY c.createdAt DESC" };

    try {
        const { resources } = await container
            .items
            .query(querySpec)
            .fetchAll();

        return res.status(200).json({ expenses: resources });
    } catch (e) {
        console.error(e)
        return res.status(500).json({ "error": "Something went wrong! Please try again..." });
    }
}

export async function createExpense(req, res, next) {
    try {
        const title = req.body.title || null;
        const amount = req.body.amount || null;

        if (!title || !amount) {
            return res.status(422).json({ error: "Please send both title and amount" })
        }

        const now = new Date()

        await container
            .items.create({ title, amount: Number(amount), createdAt: now.toISOString() })

        return res.status(200).json({ info: "Item deleted successfully!" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ "error": "Something went wrong! Please try again..." });
    }
}

export async function editExpense(req, res, next) {
    const { id } = req.params;

    try {
        const title = req.body.title || null;
        const amount = req.body.amount || null;

        if (!title || !amount) {
            return res.status(422).json({ error: "Please send both title and amount" })
        }

        const item = await container.item(id, id).read();

        await container
            .item(id, id).replace({ id, title, amount, createdAt: item.resource.createdAt })

        return res.status(200).json({ info: "Item updated successfully!" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ "error": "Something went wrong! Please try again..." });
    }
}

export async function deleteExpense(req, res, next) {
    const { id } = req.params;

    try {
        await container
            .item(id, id)
            .delete()

        return res.status(200).json({ info: "Item deleted successfully!" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ "error": "Something went wrong! Please try again..." });
    }
}
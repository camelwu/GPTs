module.exports = function (app) {
    app.get("/", async (req, res) => {
        res.json({ response: "Hello from the assistants API!"});
    });
}

const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repo)
  return response.json(repo)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repoIndex = repositories.findIndex(rep => rep.id === id);
  if (!repositories[repoIndex]) {
    return response.status(400).json({ error: "Repositories does not exist." })
  }
  const { title, url, techs } = request.body;
  const repo = { ...repositories[repoIndex], title, url, techs }
  repositories[repoIndex] = repo
  return response.json(repo)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repoIndex = repositories.findIndex(rep => rep.id === id);
  if (!repositories[repoIndex]) {
    return response.status(400).json({ error: "Repositories does not exist." })
  }
  repositories.splice(repoIndex, 1)
  return response.send(204)
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const repoIndex = repositories.findIndex(rep => rep.id === id);
  if (!repositories[repoIndex]) {
    return response.status(400).json({ error: "Repositories does not exist." })
  }

  const repo = repositories[repoIndex]
  repo.likes++
  repositories[repoIndex] = repo
  return response.json(repo)
});

module.exports = app;

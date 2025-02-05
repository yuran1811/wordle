<h1 align="center">wordle</h1>
<p align="center" style="font-size:16px"><strong>A <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Wordle</a> Clone Site</strong></p>
<p align="center">  
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png" width="400" />
</p>

<p align="center">
  <img alt="Stars" src="https://badgen.net/github/stars/yuran1811/wordle">
  <img alt="Forks" src="https://badgen.net/github/forks/yuran1811/wordle">
  <img alt="Issues" src="https://badgen.net/github/issues/yuran1811/wordle">
  <img alt="Commits" src="https://badgen.net/github/commits/yuran1811/wordle">
  <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/yuran1811/wordle">
</p>

<div align="center"><a href="https://yuran1811.github.io/wordle/" target="_blank">Live Demo</a></div>

## Tech Stack

<img src="https://skill-icons-livid.vercel.app/icons?i=react,redux,tailwindcss,ts,vite&gap=60" height="36" />

## Screenshots

![](./public/screenshots/gameplay.png)

## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/yuran1811/wordle.git
cd wordle
```

**Installation**

Install the project dependencies:

```bash
npm install
```

or

```bash
yarn
```

**Running the Project**

```bash
npm run dev
```

or

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

**Update the words list**

- Create or edit the `./scripts/data.txt` file (words are separated from space `\s` or newline `\n`)
- Open terminal in `wordle` dir, run

```bash
npm run data:prepare
```

or

```bash
yarn data:prepare
```

# 🧠 GUÍA GIT PARA SACAR LA PUNTUACIÓN MÁXIMA EN EL APARTADO GIT 

> ⚙️ Sigue estos pasos EXACTOS en Visual Studio Code después de clonar tu repositorio.  
> Si haces todo lo que aparece aquí, conseguirás **la nota completa en GitFlow**.

---

## 🚀 1. INICIALIZA GITFLOW

Abre la terminal en VS Code y escribe:

```bash
git flow init -d
git push --all origin && git push --tags origin
```

> 💡 Esto crea las ramas necesarias:
> - `main` (o `master`)
> - `develop`

✅ Ya tienes el punto por tener `develop`.

---

## 🌿 2. CREA LAS FEATURES

> Cada práctica pide varias ramas `feature/...`.  
> Crea **todas las que pida el enunciado** con `git flow feature start`.

Ejemplo:

```bash
git flow feature start postman-collections
```
añade las modificaciones que pida la feature
```bash
git add .
git commit -m "feat: work on collections"

git push --all origin && git push --tags origin
git flow feature finish postman-collections --keep

git flow feature start environment-variables
```
añade las modificaciones que pida la otra feature
```bash
git add .
git commit -m "feat: environment variables"

git push --all origin && git push --tags origin
git flow feature finish environment-variables --keep
```

⚠️ **IMPORTANTE:**  
Ejecuta **este comando** durante el desarrollo de cada feature, antes de cerrarla:

```bash
git push --all origin && git push --tags origin
```

👉 Si no lo haces, las features pueden **borrarse al cerrarse** y **no subirán al repositorio remoto**, por lo que el evaluador **no las verá** y **te quitará puntos**.

---

## 🧩 3. CREA LA RELEASE

Cuando termines todas las features:

```bash
git flow release start v1.0.0
git add .
git commit -m "chore(release): prepare v1.0.0"
git push --all origin && git push --tags origin
git flow release finish v1.0.0 --keep
```

> 💡 Esto genera automáticamente:
> - La rama `release/v1.0.0`
> - El **tag** `v1.0.0`
> - Merge hacia `main` y `develop`

✅ Ya tienes los puntos por **release** y **tags**.

---

## ☁️ 4. SUBE TODO A GITHUB

Cuando acabes **todas las fases**, asegúrate de subir **todo** otra vez:

```bash
git push --all origin && git push --tags origin
```

> ⚠️ Repite este comando SIEMPRE que hagas algo nuevo (durante features, releases, hotfixes, etc).  
> Es el que **garantiza que el evaluador remoto vea todo**.

---

## ✅ 5. CHECKLIST FINAL

| Elemento | Debe existir | Cómo comprobarlo |
|-----------|---------------|------------------|
| `develop` | ✅ | `git branch -a` |
| Varias `feature/...` | ✅ | `git branch -a` |
| `release/v1.0.0` | ✅ | `git branch -a` |
| Tag `v1.0.0` | ✅ | `git tag` |
| Todo subido a remoto | ✅ | `git push --all origin && git push --tags origin` |

---

💥 **FIN — Si has hecho todo esto, el evaluador te da 10/10 en la parte de GitFlow**

# HTW | Playground: Fork Colors

[![Check colors.json](https://github.com/tigion/htwd-playground-fork-colors/actions/workflows/check-colors-json.yaml/badge.svg)](https://github.com/tigion/htwd-playground-fork-colors/actions/workflows/check-colors-json.yaml)

Das Repository dient im Praktikum als Spielwiese, um **Fork** und **Pull-Request**
kennenzulernen. Es ist eine kleine Webanwendung, welche über GitHub Page angezeigt
wird und anhand einer JSON-Datei Farbkreise darstellt.

- GitHub Page: <https://tigion.github.io/htwd-playground-fork-colors/>
- Aufgabenstellung im Praktikum: [Teil 6 - Aufgabe 2.1 - Fork mit Pull-Request](https://www.informatik.htw-dresden.de/~zirkelba/praktika/se/git-docs-collab/06-code-review.html#_aufgabe_2_1_fork_mit_pull_request)

## Worum geht es?

Um einen Farbkreis in diesem Repository zu hinterlassen, muss ein Fork mit einem
Pull-Request durchgeführt werden.

Dazu muss in einem Pull-Request die JSON-Datei _colors.json_ im Verzeichnis
`/data` entsprechend ihres Sitzplatzes im Praktikum angepasst werden. Hier wird
ein Eintrag mit dem GitHub-Account oder Namen bei `id:` und einer Farbe im
rgb-Format bei `color:` hinterlassen.

## Aufbau der _colors.json_ Datei

In der Datei _colors.json_ befinden sich ein Array von Objekten bestehend aus
einer ID (`id`) und einer Farbe (`color`):

```json
[
  ...
  {
    "id": "Name",
    "color": { "r": 255, "g": 85, "b": 0 }
  },
  ...
]
```

> [!NOTE]
> Am Ende der _colors.json_ Datei befinden sich vorbereitete leere Einträge zur
> Verwendung im Praktikum. Der zu nutzende Eintrag, entsprechend des Platzes im
> Praktikum, ist mit einem Kommentar (`_comment`) gekennzeichnet:
>
> ```json
> [
>   {
>     "_comment": "Reihe 1 Platz 1",
>     "id": "",
>     "color": { "r": 255, "g": 255, "b": 255 }
>   },
>   {
>     "_comment": "Reihe 2 Platz 1",
>     "id": "",
>     "color": { "r": 255, "g": 255, "b": 255 }
>   },
>   ...
> ]
> ```

- `_comment:` ... Kommentar für Platz im Praktikum,
  um unnötige Mergekonflikte zu umgehen
- `id:` ... GitHub-Account oder anderer Name
- `color:`
  - `r:` ... Wert von **rot** zwischen `0` und `255`
  - `g:` ... Wert von **gelb** zwischen `0` und `255`
  - `b:` ... Wert von **blau** zwischen `0` und `255`

Achtet beim Hinzufügen eines neuen `{ id: ... colors: ... }`-Eintrages darauf,
dass sich vor dem letzten Eintrag **ein Komma** und danach **keines** befindet.

## Vorgehen

1. Forke dieses Repository als Kopie in deinen Account.
2. Clone es lokal auf deinen Rechner.
3. (optional) Erstelle dir einen neuen Branch und wechsle in diesen.
4. Passe einen Eintrag entsprechend deines Platzes im Praktikum (siehe Attribute
   `_comment`) an.

   ```json
   {
     "_comment": "Reihe 2 Platz 1",
     "id": "my_name_or_account",
     "color": { "r": 12, "g": 34, "b": 45 }
   }
   ```

   Alternativ: Füge der _colors.json_ **am Ende** einen neuen Eintrag mit
   deinen Werten hinzu (dies kann zu merge-Konflikten führen).

5. Nimm die Änderung als neuen Commit auf und pushe sie mit dem zugehörigen
   Branch in dein Repository.
6. Schlage mir jetzt die Änderung als Pull-Request vor.
7. Ich schaue mir - _undefinierte Verzögerung_ - deinen Pull-Request an.
   Ist er okay, übernehme ich die Änderung und nach kurzer Zeit ist dein
   Farbkreis zu sehen. Ist er nicht okay hinterlasse ich einen Kommentar.
8. Ist der Pull-Request erfolgreich von mir übernommen, kann dein Fork
   (bei nicht gebrauch) gelöscht werden.

Alternativ kann das Editieren direkt auf GitHub im Webbrowser geschehen.
Dabei wird automatisch ein Fork mit zugehörigem Pull-Request über einen
Änderungsvorschlag (_Propose Changes_) erstellt.
Dies ist nur für die Bearbeitung einer einzelnen Datei empfohlen, da für
jede angepasste Datei ein Pull-Request erstellt wird.

# full-stack-open
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user is submitting the data by pressing submit button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: text/html
    deactivate server

    Note right of browser: The browser is appending the <li> item to the <ul> notes
```

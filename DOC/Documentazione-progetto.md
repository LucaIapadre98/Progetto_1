# Documentazione del progetto

## 1. Scopo dell'applicazione

L'applicazione **Teamspace** è una piccola rubrica per gestire un gruppo di lavoro. Permette di:

- visualizzare i dipendenti in schede;
- aggiungere una persona con nome, ruolo e dipartimento;
- cercare nella rubrica;
- aprire la scheda di dettaglio facendo clic sul nome;
- eliminare una persona;
- consultare un riepilogo del gruppo e una frase d'ispirazione nella scheda personale.

L'interfaccia è realizzata con React e Vite. I componenti descrivono i contenuti, mentre il foglio CSS definisce l'aspetto e il comportamento responsive.

## 2. Struttura dei file

| File | Responsabilità |
|---|---|
| `index.html` | Pagina HTML iniziale che contiene l'elemento React `#root`. |
| `src/main.jsx` | Avvia React, importa lo stile globale e monta `App`. |
| `src/components/App.jsx` | Gestisce i dati, le azioni dell'utente e le viste principali. |
| `src/components/Intro.jsx` | Mostra la schermata introduttiva e il pulsante per entrare nella rubrica. |
| `src/components/EmployeeCard.jsx` | Rappresenta una persona nella griglia della rubrica. |
| `src/components/DetailsCard.jsx` | Mostra i dettagli e una frase d'ispirazione per la persona selezionata. |
| `src/Css/index.css` | Contiene gli stili globali, i componenti grafici, le animazioni e gli adattamenti per schermi piccoli. |
| `package.json` | Elenca le dipendenze e i comandi npm del progetto. |

## 3. Avvio dell'applicazione

Il file `src/main.jsx` importa React, il foglio di stile principale e il componente radice:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/Css/index.css'
import App from './components/App.jsx'
```

`createRoot(...).render(...)` monta `App` nell'elemento HTML con ID `root`. `StrictMode` aiuta a individuare alcuni problemi durante lo sviluppo; non è un contenuto visibile all'utente.

In `index.html`, `<div id="root"></div>` è il contenitore in cui React disegna l'applicazione. Il tag `<script type="module" src="/src/main.jsx">` carica il punto di ingresso.

## 4. Schermata introduttiva — `Intro.jsx`

`Intro` riceve la funzione `onStart` come proprietà. La pagina contiene:

- il marchio grafico Teamspace;
- un titolo e un testo di presentazione;
- il pulsante **Scopri il team**, che richiama `onStart`;
- un'anteprima decorativa con alcuni membri e una nota di benvenuto.

Il pulsante non aggiunge o modifica dati: comunica ad `App` che l'utente vuole entrare nella rubrica. I nomi mostrati nell'anteprima sono solo elementi illustrativi, separati dall'elenco effettivo gestito da `App`.

## 5. Componente principale — `App.jsx`

`App` coordina le schermate e le operazioni sui dipendenti.

### Stato React

```jsx
const [mostraIntro, setMostraIntro] = useState(true);
const [dipendenti, setDipendenti] = useState([...]);
const [nuovoDipendente, setNuovoDipendente] = useState({
    nome: "",
    ruolo: "",
    dipartimento: ""
});
const [dipendenteSelezionato, setDipendenteSelezionato] = useState(null);
const [ricerca, setRicerca] = useState("");
```

- `mostraIntro` decide se mostrare la presentazione o la rubrica.
- `dipendenti` contiene l'elenco corrente; ciascun oggetto ha `id`, `nome`, `ruolo` e `dipartimento`.
- `nuovoDipendente` conserva i valori digitati nei tre campi del modulo.
- `dipendenteSelezionato` contiene la persona di cui è aperto il dettaglio, oppure `null`.
- `ricerca` contiene il testo inserito nella casella di ricerca.

Questi dati restano nello stato React in memoria mentre l'app è aperta. Non essendoci un database o un salvataggio locale, le modifiche si perdono ricaricando la pagina.

### Riepilogo e ricerca

La lista filtrata confronta il testo cercato con nome, ruolo e dipartimento, ignorando maiuscole e minuscole. I conteggi per dipartimento e ruolo sono calcolati con `Set`, che mantiene una sola occorrenza per valore. Le tre schede di riepilogo mostrano questi risultati e il numero totale dei dipendenti.

Il filtro può essere letto in questo modo:

```jsx
const dipendentiFiltrati = dipendenti.filter(dipendente =>
    [dipendente.nome, dipendente.ruolo, dipendente.dipartimento]
        .some(valore =>
            valore.toLocaleLowerCase().includes(ricerca.trim().toLocaleLowerCase())
        )
);
```

`filter` conserva solo i dipendenti che corrispondono alla ricerca; `some` controlla tutti e tre i campi e `includes` individua anche corrispondenze parziali.

### Aggiunta di un dipendente

`aggiungiDipendente(event)`:

1. impedisce al modulo di ricaricare la pagina con `event.preventDefault()`;
2. rimuove spazi iniziali e finali dai valori;
3. non aggiunge il dipendente se un campo è vuoto;
4. crea un nuovo ID e aggiunge il record all'elenco con `setDipendenti`;
5. svuota i campi del modulo.

Gli aggiornamenti usano la forma funzionale, per esempio `setDipendenti(prevDipendenti => [...prevDipendenti, nuovoElemento])`, così si parte sempre dall'ultima versione dello stato.

Ogni input del modulo è controllato da React: `value` legge il valore da `nuovoDipendente` e `onChange` aggiorna solo il campo modificato, mantenendo gli altri:

```jsx
onChange={event =>
    setNuovoDipendente(prev => ({
        ...prev,
        nome: event.target.value
    }))
}
```

Il simbolo `...prev` copia i valori già presenti prima di sostituire `nome`. La stessa logica è usata per ruolo e dipartimento.

### Eliminazione e selezione

- `eliminaDipendente(id)` filtra l'elenco e rimuove la persona con quell'ID.
- `onSelect` apre il dettaglio della persona selezionata.
- Il pulsante di ritorno imposta la selezione a `null` e riporta alla rubrica.

La lista è generata con `.map()`: per ogni record viene creato un `EmployeeCard`. `key={dipendente.id}` aiuta React a riconoscere ogni elemento quando la lista cambia.

### Viste condizionali

L'ordine di visualizzazione è:

1. schermata `Intro` se `mostraIntro` è `true`;
2. dettaglio della persona se esiste `dipendenteSelezionato`;
3. altrimenti intestazione, riepilogo, modulo, ricerca e griglia dei dipendenti.

Se la ricerca non restituisce risultati, viene mostrato un messaggio al posto delle schede.

## 6. Scheda della rubrica — `EmployeeCard.jsx`

`EmployeeCard` riceve `nome`, `ruolo`, `dipartimento`, `onSelect` e `onDelete`.

- Il nome è un link stilizzato come testo: al clic impedisce la navigazione dell'ancora e richiama `onSelect`.
- Ruolo e dipartimento sono mostrati sotto il nome.
- **Elimina** richiama `onDelete`, che rimuove la persona dalla lista.

`App` fornisce le funzioni di callback. Il componente non modifica direttamente l'elenco: presenta i dati e segnala le azioni all'elemento che lo contiene.

Il nome è un link HTML con il comportamento gestito da React:

```jsx
<a
    href="#dettaglio-dipendente"
    onClick={event => {
        event.preventDefault();
        onSelect();
    }}
>
    {nome}
</a>
```

`preventDefault()` evita che il browser salti a un'ancora inesistente; `onSelect()` chiede al componente principale di aprire il dettaglio. Il pulsante **Elimina** richiama invece `onDelete`.

## 7. Scheda di dettaglio — `DetailsCard.jsx`

`DetailsCard` riceve l'identificativo e i dati della persona. Mostra:

- l'iniziale del nome dentro un avatar;
- il nome completo;
- ruolo e dipartimento in una lista descrittiva (`dl`, `dt`, `dd`);
- una frase d'ispirazione.

Le frasi sono contenute nell'array `frasi`. L'indice viene scelto con `(id - 1) % frasi.length`: ogni ID seleziona una frase in modo stabile e, se gli elementi superano il numero di frasi, la sequenza ricomincia.

La scheda usa elementi HTML descrittivi: `<dl>` contiene i dati, `<dt>` ne indica l'etichetta e `<dd>` il valore. La frase viene selezionata così:

```jsx
const frase = frasi[(id - 1) % frasi.length];
```

Lo stesso ID viene passato da `App` a `DetailsCard`, insieme a nome, ruolo e dipartimento.

## 8. Stili — `src/Css/index.css`

Il CSS è organizzato per aree:

### Regole globali

`:root` definisce carattere, colori condivisi e impostazioni di rendering. `*` applica `box-sizing: border-box`; `body` imposta margini, sfondo sfumato e dimensione minima. Le regole per `button` e `input` uniformano i controlli.

### Pagina introduttiva

Le classi `.intro-*`, `.brand-*`, `.team-preview`, `.preview-*` e `.floating-*` costruiscono il layout della presentazione, il marchio, la scheda illustrativa del team e la nota sovrapposta. `@keyframes preview-arrive` e `@keyframes note-arrive` animano l'ingresso degli elementi.

### Pagina principale

- `#root > div`, `h1`, `.page-heading`, `.page-eyebrow` e `.page-subtitle` definiscono la larghezza e l'intestazione.
- `.team-overview` e `.overview-*` impaginano i tre indicatori riepilogativi.
- `form`, `form label`, `form input` e `form button` curano modulo, campi, focus e pulsante di aggiunta.
- `.directory-heading`, `.search-field` ed `.empty-state` formattano intestazione della rubrica, campo di ricerca e messaggio senza risultati.
- `.employee-list` crea la griglia delle persone. `.card` e le sue regole figlie stilizzano ciascun dipendente.
- `.employee-list .card:hover` applica l'effetto 3D soltanto alle schede della rubrica; non alle schede nella pagina di dettaglio.

La prospettiva 3D è applicata al contenitore e la trasformazione alle card:

```css
.employee-list {
    perspective: 950px;
}

.employee-list .card:hover {
    transform: translateY(-7px) rotateX(5deg) rotateY(-3deg) scale(1.015);
}
```

`perspective` crea profondità; `rotateX` e `rotateY` inclinano la card; `translateY` la solleva leggermente. L'effetto è limitato alla griglia dei dipendenti.

### Dettaglio e accessibilità

`.details-page`, `.back-button`, `.detailsCard`, `.details-fields` e `.inspiration-card` compongono la pagina personale. Le regole `:focus-visible` evidenziano i controlli durante la navigazione da tastiera; `.sr-only` rende disponibile un'etichetta accessibile senza mostrarla graficamente.

### Adattamento e movimento

Le media query `max-width: 760px` e `max-width: 520px` riorganizzano griglie, spazi e intestazioni su tablet e telefoni. `prefers-reduced-motion: reduce` riduce o disattiva le animazioni quando l'utente ha richiesto meno movimento nel sistema operativo.

## 9. Dipendenze e comandi

Il progetto usa **React** e **React DOM** per l'interfaccia e **Vite** come server e sistema di build. ESLint è configurato per il controllo del codice.

Da un terminale aperto nella cartella del progetto:

```bash
npm run dev
npm run build
npm run lint
```

- `npm run dev` avvia il server locale di sviluppo.
- `npm run build` crea la versione pronta per la distribuzione.
- `npm run lint` esegue ESLint.

## 10. Flusso d'uso

1. Si apre la schermata di presentazione.
2. **Scopri il team** porta alla pagina principale.
3. Il modulo aggiunge un dipendente e aggiorna conteggi e griglia.
4. La ricerca restringe le schede in base ai dati digitati.
5. Facendo clic sul nome si apre il dettaglio; il pulsante di ritorno riporta alla rubrica.
6. **Elimina** rimuove una scheda e aggiorna i conteggi.

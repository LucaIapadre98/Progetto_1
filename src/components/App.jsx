import { useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import DetailsCard from "./DetailsCard";
import Intro from "./Intro";

export default function App() {
    const [mostraIntro, setMostraIntro] = useState(true);
    const [dipendenti, setDipendenti] = useState([
        {
            id: 1,
            nome: "Luca",
            ruolo: "Frontend Developer",
            dipartimento: "IT"
        },
        {
            id: 2,
            nome: "Marco",
            ruolo: "Backend Developer",
            dipartimento: "IT"
        },
        {
            id: 3,
            nome: "Andrea",
            ruolo: "Project Manager",
            dipartimento: "Management"
        },
        {
            id: 4,
            nome: "Serena",
            ruolo: " Manager di Progetto",
            dipartimento: "Management"
        },
        {
            id: 5,
            nome: "Alessandro",
            ruolo: "Full Stack Developer",
            dipartimento: "IT"
        },
        {
            id: 6,
            nome: " Barbara",
            ruolo: "UX Designer",
            dipartimento: "Management"
        }
    ]);

    const [nuovoDipendente, setNuovoDipendente] = useState({
        nome: "",
        ruolo: "",
        dipartimento: ""
    });
    const [dipendenteSelezionato, setDipendenteSelezionato] = useState(null);
    const [ricerca, setRicerca] = useState("");

    const dipendentiFiltrati = dipendenti.filter(dipendente =>
        [dipendente.nome, dipendente.ruolo, dipendente.dipartimento]
            .some(valore => valore.toLocaleLowerCase().includes(ricerca.trim().toLocaleLowerCase()))
    );
    const numeroDipartimenti = new Set(
        dipendenti.map(dipendente => dipendente.dipartimento.trim().toLocaleLowerCase())
    ).size;
    const numeroRuoli = new Set(
        dipendenti.map(dipendente => dipendente.ruolo.trim().toLocaleLowerCase())
    ).size;

    function aggiungiDipendente(event) {
        event.preventDefault();

        const dipendente = {
            nome: nuovoDipendente.nome.trim(),
            ruolo: nuovoDipendente.ruolo.trim(),
            dipartimento: nuovoDipendente.dipartimento.trim()
        };

        if (!dipendente.nome || !dipendente.ruolo || !dipendente.dipartimento) {
            return;
        }

        setDipendenti(prevDipendenti => [
            ...prevDipendenti,
            {
                id: Math.max(0, ...prevDipendenti.map(item => item.id)) + 1,
                ...dipendente
            }
        ]);
        setNuovoDipendente({ nome: "", ruolo: "", dipartimento: "" });
    }

    function eliminaDipendente(id) {

        setDipendenti(prevDipendenti =>
            prevDipendenti.filter(
                dipendente => dipendente.id !== id
            )
        );

    }

    return (

        <div className={mostraIntro ? "intro-shell" : undefined}>

            {mostraIntro ? (
                <Intro onStart={() => setMostraIntro(false)} />
            ) : dipendenteSelezionato ? (
                <section className="details-page">
                    <button
                        className="back-button"
                        type="button"
                        onClick={() => setDipendenteSelezionato(null)}
                    >
                        ← Torna alla lista
                    </button>
                    <p className="details-eyebrow">SCHEDA DIPENDENTE</p>
                    <h1>Dettaglio dipendente</h1>
                    <DetailsCard
                        id={dipendenteSelezionato.id}
                        nome={dipendenteSelezionato.nome}
                        ruolo={dipendenteSelezionato.ruolo}
                        dipartimento={dipendenteSelezionato.dipartimento}
                    />
                </section>
            ) : (
                <>
                    <header className="page-heading">
                        <p className="page-eyebrow">AREA TEAM</p>
                        <h1>Gestione del team</h1>
                        <p className="page-subtitle">
                            Organizza persone, ruoli e dipartimenti in un unico spazio.
                        </p>
                    </header>

                    <section className="team-overview" aria-label="Riepilogo del team">
                        <article className="overview-card overview-people">
                            <span className="overview-icon" aria-hidden="true">◎</span>
                            <span className="overview-label">Persone nel team</span>
                            <strong>{dipendenti.length}</strong>
                            <span className="overview-note">membri registrati</span>
                        </article>
                        <article className="overview-card overview-departments">
                            <span className="overview-icon" aria-hidden="true">▦</span>
                            <span className="overview-label">Dipartimenti</span>
                            <strong>{numeroDipartimenti}</strong>
                            <span className="overview-note">aree rappresentate</span>
                        </article>
                        <article className="overview-card overview-roles">
                            <span className="overview-icon" aria-hidden="true">✳</span>
                            <span className="overview-label">Ruoli distinti</span>
                            <strong>{numeroRuoli}</strong>
                            <span className="overview-note">competenze nel gruppo</span>
                        </article>
                    </section>

                    <form onSubmit={aggiungiDipendente}>
                <label>
                    Nome
                    <input
                        type="text"
                        value={nuovoDipendente.nome}
                        onChange={event =>
                            setNuovoDipendente(prev => ({
                                ...prev,
                                nome: event.target.value
                            }))
                        }
                        required
                    />
                </label>

                <label>
                    Ruolo
                    <input
                        type="text"
                        value={nuovoDipendente.ruolo}
                        onChange={event =>
                            setNuovoDipendente(prev => ({
                                ...prev,
                                ruolo: event.target.value
                            }))
                        }
                        required
                    />
                </label>

                <label>
                    Dipartimento
                    <input
                        type="text"
                        value={nuovoDipendente.dipartimento}
                        onChange={event =>
                            setNuovoDipendente(prev => ({
                                ...prev,
                                dipartimento: event.target.value
                            }))
                        }
                        required
                    />
                </label>

                <button type="submit">Aggiungi dipendente</button>
                    </form>

                    <div className="directory-heading">
                        <div>
                            <h2>Persone del team</h2>
                            <p>
                                {ricerca
                                    ? `${dipendentiFiltrati.length} risultati per "${ricerca}"`
                                    : "Seleziona un nome per consultare la scheda."}
                            </p>
                        </div>
                        <label className="search-field">
                            <span className="search-icon" aria-hidden="true">⌕</span>
                            <span className="sr-only">Cerca nel team</span>
                            <input
                                type="search"
                                placeholder="Cerca persone, ruoli..."
                                value={ricerca}
                                onChange={event => setRicerca(event.target.value)}
                            />
                        </label>
                    </div>

                    <div className="employee-list">

                {dipendentiFiltrati.length > 0 ? dipendentiFiltrati.map(dipendente => (

                    <EmployeeCard
                        key={dipendente.id}
                        nome={dipendente.nome}
                        ruolo={dipendente.ruolo}
                        dipartimento={dipendente.dipartimento}
                        onSelect={() => setDipendenteSelezionato(dipendente)}
                        onDelete={() =>
                            eliminaDipendente(dipendente.id)
                        }
                    />

                )) : (
                    <p className="empty-state">
                        Nessuna persona trovata. Prova con un altro nome, ruolo o dipartimento.
                    </p>
                )}

                    </div>
                </>
            )}

        </div>
    );
};
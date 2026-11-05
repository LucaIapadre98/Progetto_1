const frasi = [
    "Ogni grande progetto comincia con una semplice idea e la voglia di darle vita.",
    "Il codice migliore è quello che trasforma un problema in una nuova possibilità.",
    "Dietro ogni interfaccia semplice c'è una grande attenzione ai dettagli.",
    "Un buon progetto cresce quando le idee diventano collaborazione.",
    "Sbagliare, imparare, riprovare: è così che si costruisce qualcosa di grande.",
    "La tecnologia dà forma alle idee; la creatività decide dove portarci.",
    "Ogni riga di codice è un piccolo passo verso qualcosa che prima non esisteva.",
    "Le soluzioni migliori nascono dalla curiosità e dal lavoro di squadra."
];

export default function DetailsCard({ id, nome, ruolo, dipartimento }) {
    const frase = frasi[(id - 1) % frasi.length];

    return (
        <div className="details-content">
            <div className="detailsCard">
                <div className="details-avatar" aria-hidden="true">
                    {nome.trim().charAt(0).toUpperCase()}
                </div>
                <h2>{nome}</h2>
                <dl className="details-fields">
                    <div>
                        <dt>Ruolo</dt>
                        <dd>{ruolo}</dd>
                    </div>
                    <div>
                        <dt>Dipartimento</dt>
                        <dd>{dipartimento}</dd>
                    </div>
                </dl>
            </div>

            <section className="inspiration-card" aria-label="Pensiero sulla programmazione">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p className="inspiration-label">UNA PICCOLA ISPIRAZIONE</p>
                <blockquote>
                    {frase}
                </blockquote>
                <div className="quote-footer">
                    <span className="quote-line" aria-hidden="true" />
                    <span>Un passo di codice alla volta</span>
                </div>
            </section>
        </div>
    );
}
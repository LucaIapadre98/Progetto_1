export default function Intro({ onStart }) {
    return (
        <main className="intro-page">
            <section className="intro-copy">
                <a className="brand-mark" href="#inizio" aria-label="Teamspace, pagina iniziale">
                    <span className="brand-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20" />
                            <circle cx="9.5" cy="7.5" r="3.5" />
                            <path d="M17 11a3.5 3.5 0 1 0-1.2-6.8M21 20v-1.6a3.4 3.4 0 0 0-2.6-3.3" />
                        </svg>
                    </span>
                    <span>teamspace</span>
                </a>

                <div className="intro-message">
                    <p className="intro-eyebrow">PERSONE, IDEE, COLLABORAZIONE</p>
                    <h1>
                        Il tuo team,
                        <span> al centro.</span>
                    </h1>
                    <p className="intro-description">
                        Uno spazio semplice e curato per conoscere il tuo team,
                        valorizzare ogni ruolo e tenere tutto organizzato.
                    </p>
                    <button className="intro-cta" type="button" onClick={onStart}>
                        Scopri il team
                        <span aria-hidden="true">→</span>
                    </button>
                    <p className="intro-note">Tutto quello che ti serve, in un unico spazio.</p>
                </div>
            </section>

            <aside className="intro-visual" aria-label="Anteprima del team">
                <div className="visual-orbit orbit-one" />
                <div className="visual-orbit orbit-two" />
                <div className="team-preview">
                    <div className="preview-topline">
                        <span className="preview-dot" />
                        <span>IL NOSTRO TEAM</span>
                    </div>
                    <div className="preview-heading">
                        <span>Le persone fanno la differenza.</span>
                        <span className="preview-sparkle" aria-hidden="true">✦</span>
                    </div>
                    <div className="preview-members">
                        <div className="preview-member">
                            <span className="member-avatar avatar-lilac">L</span>
                            <span><strong>Luca</strong><small>Frontend Developer</small></span>
                            <span className="member-status" aria-label="Attivo" />
                        </div>
                        <div className="preview-member">
                            <span className="member-avatar avatar-blue">M</span>
                            <span><strong>Marco</strong><small>Backend Developer</small></span>
                            <span className="member-status" aria-label="Attivo" />
                        </div>
                        <div className="preview-member">
                            <span className="member-avatar avatar-peach">A</span>
                            <span><strong>Andrea</strong><small>Project Manager</small></span>
                            <span className="member-status" aria-label="Attivo" />
                        </div>
                    </div>
                    <div className="preview-footer">
                        <span className="preview-avatars" aria-hidden="true">
                            <i>L</i><i>M</i><i>A</i>
                        </span>
                        <span>Competenze diverse, un obiettivo comune.</span>
                    </div>
                </div>
                <div className="floating-note">
                    <span className="floating-check" aria-hidden="true">✓</span>
                    <span><strong>Un team organizzato</strong><small>parte da qui</small></span>
                </div>
            </aside>
        </main>
    );
}
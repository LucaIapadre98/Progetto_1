export default function EmployeeCard({ nome, ruolo, dipartimento, onSelect, onDelete }) {

    return (

        <div className="card">
            <h2>
                <a
                    className="employee-name"
                    href="#dettaglio-dipendente"
                    onClick={event => {
                        event.preventDefault();
                        onSelect();
                    }}
                >
                    {nome}
                </a>
            </h2>

            <p>Ruolo: {ruolo}</p>

            <p>Dipartimento: {dipartimento}</p>

            <button onClick={onDelete}>
                Elimina
            </button>
        </div>
    );
};
export function buildOrderTableColumn() {
    return [
        {
            Header: "Nom",
            accessor: "nom",
        },
        {
            Header: "Prenom",
            accessor: "prenom",
        },
        {
            Header: "Adresse",
            accessor: "adresse",
        },
        {
            Header: "Ville",
            accessor: "ville",
        },
        {
            Header: "Code Postal",
            accessor: "codePostal",
        },
        {
            Header: "Type Commande",
            accessor: "type",
        },
        {
            Header: "Produit",
            accessor: "produitNom",
        },
        {
            Header: "Quantité",
            accessor: "quantite",
        },
        {
            Header: "Statut",
            accessor: "statut",
        },
    ];
}

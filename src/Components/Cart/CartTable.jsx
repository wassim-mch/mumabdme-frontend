import React from "react";
import "./CartTable.css";

const CartTable = ({ items, onRemove }) => {
<<<<<<< HEAD
  // Convertit tous les prix en nombre puis additionne
  const totalGeneral = items.reduce((acc, item) => {
    return acc + Number(item.price); // <-- FIX principal
  }, 0);
=======
  // Calcul du total général
  const totalGeneral = items.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

  return (
    <div className="cart-table-wrapper">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Prix (DA)</th>
            <th>Action</th>
            <th>Total (DA)</th>
          </tr>
        </thead>
<<<<<<< HEAD

=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Aucun service dans le panier
              </td>
            </tr>
          ) : (
<<<<<<< HEAD
            items.map((item) => {
              const priceNumber = Number(item.price); // force conversion

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{priceNumber} DA</td>

                  <td>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}>
                      Supprimer
                    </button>
                  </td>

                  <td>{priceNumber} DA</td>
                </tr>
              );
            })
          )}

          {/* Ligne total */}
=======
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                  >
                    Supprimer
                  </button>
                </td>
                <td>{item.price}</td>
              </tr>
            ))
          )}

          {/* Ligne Total Général */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          {items.length > 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "right", fontWeight: "700" }}>
                Total Général :
              </td>
              <td style={{ fontWeight: "700" }}>{totalGeneral} DA</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;

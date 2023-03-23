import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Website development</td>
              <td><PriceHighlight variant="income">R$ 12.000,00</PriceHighlight></td>
              <td>Work</td>
              <td>23/03/2023</td>
            </tr>
            <tr>
              <td width="50%">Lunch</td>
              <td><PriceHighlight variant="outcome">- R$ 10,00</PriceHighlight></td>
              <td>Food</td>
              <td>20/03/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
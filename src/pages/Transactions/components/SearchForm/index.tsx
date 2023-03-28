import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { memo } from 'react'

/**
 * Why React renders a comonent?
 * 1. Hooks changed (state, context, reducer...)
 * 2. Props changed
 * 3. Parent rerendered
 *
 * What's the flow of rendering?
 * 1. React recreates the HTML of an interface of a component
 * 2. It compares the recreated HTML to it's old version in memory, it does not build it on DOM yet
 * 3. If something changed, it re-writes the HTML on screen
 *
 * Memo: it adds a "step 0" to rendering flow
 * 0. Hooks changed, props changed (deep comparison)
 * 0-1. Compare older version of hooks and props
 * 0-2. If something changed, allow re-rendering
 */

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Search for transactions"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>
  )
}

/**
 * memo is used here just for reference, it should be used only when the component have
 * a complex HTML structure or too many rules to compute. Usually the React standard flow
 * works best in most cases.
 */
export const SearchForm = memo(SearchFormComponent)

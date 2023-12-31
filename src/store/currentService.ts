import { create } from 'zustand'

import { ServiceTypes } from '@/assets/data/type'
import { generateId } from '@/assets/utils'

type CurrentServiceStore = ServiceTypes & {
  reset: () => void
  createNewCost: () => void
  removeCost: (id: string) => void
}

const initialState: () => ServiceTypes = () => ({
  id: generateId(),
  name: '',
  costs: [],
  profit_margin: '20%'
})

export const useCurrentService = create<CurrentServiceStore>((set) => ({
  ...initialState(),

  reset: () => set(_ => ({ ...initialState() })),
  createNewCost: () => set(store => ({ costs: [ ...store.costs, { id: generateId(), name: '', value: '0' }] })),
  removeCost: (costId) => set(store => ({ costs: store.costs.filter(c => c.id !== costId) }))
}))
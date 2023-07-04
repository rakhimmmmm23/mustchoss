const initialState = {
   types: [],
   costCart: null,
   filteredArchive: [],
   editDishAdmin: {},
   searchTerm:'',
   allEstablishmnets:[]
};

export const utils = {
   namespaced: true,
   state: initialState,
   actions: {
      setFilteredTypes(context, types) {
         context.commit('setFilteredTypes', types);
      },
      setCostCart(context, cost) {
         context.commit('setCostCart', cost);
      },
      setFilteredArchive(context, payload) {
         context.commit('setFilteredArchive', payload);
      },
      setEditDish(context, payload) {
         context.commit('setEditDish', payload);
      },
      setSearchTerm(context, payload) {
         context.commit('setSearchTerm', payload);
      },
      setAllEstablishmnets(context, payload) {
         context.commit('setAllEstablishmnets', payload);
      },
   },
   mutations: {
      setFilteredTypes(state, types) {
         state.types = types;
      },
      setCostCart(state, cost) {
         state.costCart = cost;
      },
      setFilteredArchive(state, payload) {
         state.filteredArchive = payload;
      },
      setEditDish(state, payload) {
         state.editDishAdmin = payload;
      },
      setSearchTerm(state, payload) {
         state.searchTerm = payload;
      },
      setAllEstablishmnets(state, payload) {
         state.allEstablishmnets = payload;
      },
   },
};

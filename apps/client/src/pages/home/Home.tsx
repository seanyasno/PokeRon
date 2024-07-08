import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { useQuery } from 'react-query';
import { POKE_API_URL } from '../../constants/api';
import { BasicPokemon } from '../../types/api/apiTypes';
import axios from 'axios';

// CR: should be in requests folder and not here
const getPokemons = async () => {
  // CR: create pokemonClient so that it would look like:
  // const { data } = await pokemonClient.get('/pokemon');
  const response = await axios.get(`${POKE_API_URL}/pokemon`);
  return response.data.results;
};

function Home() {
  // CR: should be in a hook in a separated file. an example is down below
  const {
    data: pokemons,
    isLoading,
    isError,
  } = useQuery('pokemons', getPokemons);
  // CR: and it would look like this here:
  // const { data, isLoading, isError } = usePokemons();
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  // CR: I would infer the type like this:
  // const pokemonNames = data.results.map<string>(
  // Also I would create a generic extract function so that it would look like this:
  // const pokemonNames = extract(data.results, 'name');
  // OR:
  // const pokemonNames = extract(data.results, ({ name }) => name);
  // OR:
  // const pokemonNames = extract(data.results, pokemon => pokemon.name);
  const pokemonNames: string[] = pokemons.map(
    // CR: don't use shortcuts... When you use shortcuts you lose out of context.
    // should be called pokemon
    (r: BasicPokemon) => r.name,
  );

  return (
    <>
      <h1 className="text-center p-5"> PokéRon</h1>
      <Search />
      <Pokedex pokemonNames={pokemonNames}></Pokedex>
    </>
  );
}

export default Home;

// CR: I would create a hook for the query like this:
/*
export function usePokemons(options?: QueryOptions<PokemonAPISimple>) {
  return useQuery({
    queryKey: 'pokemons',
    queryFn: getPokemons,
    ...options,
  });
}
 */

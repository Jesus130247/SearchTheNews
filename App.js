import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import React, {useState} from 'react'

// https://newsapi.org/docs/get-started
//  183daca270264bad86fc5b72972fb82a
//  https://newsapi.org/v2/everything?q=[Location]&from=[DATE]0&sortBy=[filter]&apiKey=[API_KEY]

// url https://newsapi.org/v2/everything -G \
//   -d q=Apple \
//   -d from=2025-01-21 \
//   -d sortBy=popularity \
//   -d apiKey=API_KEY
//   -d country=us \
//   -d sources=bbc-news \

export default function App() {
  const [search, setSearch] = useState('')
  const [articles, setArticles] = useState([])
  // used after user searches, but while api is loading
  const [loading, setLoading] = useState(false)


  async function handleSearch() {
    if (search.trim() === '') return
    setLoading(true)
    try {
      const data = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=183daca270264bad86fc5b72972fb82a`).then(res => res.json())
      setArticles(data.articles)
    } catch (error) {
      alert('Error Fetching articles.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
      style={styles.input}
      placeholder='Search News'
      value={search}
      onChangeText={setSearch}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading ? <Text>Loading...</Text>: null}
      {/* displays list of all titles related to your search */}
      <FlatList 
        data={articles}
        keyExtractor={(item, index) => index.toString ()}
        renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.item}>{item.title}</Text>
              <Text >{item.description}</Text>
            </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBotton:10,
    paddingLeft: 10,
  },
  item: {
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold'
  },
});

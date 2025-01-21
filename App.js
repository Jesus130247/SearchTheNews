import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import React, {useState} from 'react'
import { Image } from 'react-native-web';

export default function App() {
  const [search, setSearch] = useState('')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [inspecting, setInspecting] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState('')

  async function handleSearch() {
    setInspecting(false)
    if (search.trim() === '') return
    setLoading(true)
    try {
      const data = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=183daca270264bad86fc5b72972fb82a`).then(res => res.json())
      setArticles(data.articles.filter(data => data.title !== '[Removed]'))
    } catch (error) {
      alert('Error Fetching articles.')
    } finally {
      setLoading(false)
    }
  }

  function handleSeeMore(title) {
    setInspecting(true)
    setSelectedTitle(title)
  }

  function handleGoBack() {
    setInspecting(false)
    setSelectedTitle('')
  }
  return (
    <View style={styles.container}>
      <Image source={{uri: 'https://thumbs.dreamstime.com/b/newspaper-stack-vector-illustration-news-paper-pile-front-page-top-view-abstract-text-articles-headlines-world-news-70078112.jpg'}} 
      style={styles.image}/>
      <Text>Seach anything you want</Text>
      <TextInput 
      style={styles.input}
      placeholder='Type your search...'
      value={search}
      onChangeText={setSearch}
      />
      <Button title="Search" onPress={handleSearch} />
      {inspecting 
      ? <>
      <Button title="Go back" onPress={handleGoBack} />
      <FlatList 
        data={articles.filter(data => data.title === selectedTitle)}
        keyExtractor={(item, index) => index.toString ()}
        renderItem={({ item }) => (
            <View>
              <Text style={styles.item} onClick={handleSeeMore}>Title: {item.title}</Text>
              <Text>{item.content}</Text>
              <Text>Date Published: {item.publishedAt}</Text>
              <Text>URL: {item.url}</Text>
              <Image source={{uri: `${item.urlToImage}`}} 
              style={styles.image}/>
              <Text>url to image: {item.urlToImage}</Text>
            </View>
        )}
      />
      </>
    : <>
      {loading ? <Text>Loading...</Text>: null}
      <FlatList 
        data={articles}
        keyExtractor={(item, index) => index.toString ()}
        renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.item} onClick={() => handleSeeMore(item.title)}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
        )}
      />
    </> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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
    fontSize: 'larger',
    cursor: 'pointer'
  },
  title: {
    fontWeight: 'bold'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  }
});

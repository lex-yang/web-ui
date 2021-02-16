import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native-web';

import {
  TextField,
  PickerField,
} from './UI';


const DataTable = (props) => {
  const {
    title,
    source,
    limit = 20,
    dataClass,
    fields = dataClass.Fields,
    paging = true,
    showSearchBar = false,
    hideHeader = false,
    hideFooter = false,
    onSelectItem = null
  } = props;
  
  const [ startAt, setStartAt ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ selectedItem, setSelectedItem ] = useState('');
  const [ searchResult, setSearchResult ] = useState(null);
  const [ searchValue, setSearchValue ] = useState(''); 
  const [ searchKey, setSearchKey ] = useState('id');

  if (!source) return ( <ActivityIndicator size='large' /> );

  const PageIndex = ({ index }) => (
    <Pressable onPress={() => {
      if (currentPage !== index) {
        setCurrentPage(index);
        setStartAt(index * limit);
      }
    }}>
      <Text style={currentPage === index ? styles.currentPage : styles.pageIndex}>{index + 1}</Text>
    </Pressable>
  );

  const Paginator = () => {
    if ( limit === 0 ) return null;

    const count = Math.floor((source.length + limit - 1) / limit);

    const pageIndex = [];
    for (let i = 0; i < count; i ++) pageIndex.push(i);

    return (
      <View style={styles.paginator}>
        {pageIndex.map( value => (<PageIndex key={value} index={value} />) ) }
      </View>
    );
  }

  const FieldTitle = () => (
    <View style={{ flexDirection: "row" }} >
      { fields.map(f => <Text key={f.name} style={styles.dataItem}>{f.desc}</Text>) }
    </View>
  );
 
	const Header = () => (
    <View style={styles.listEntry}>
      <Text style={styles.title}>{title}</Text>
      { paging && <Paginator /> }
      <FieldTitle />
    </View>
  );

  const Footer = () => (
    <View style={styles.listEntry}>
      <FieldTitle />
      { paging && <Paginator /> }
    </View>
  );

  const SearchBar = () => (
    <>
      <TextField
        title='搜尋'
        defaultValue={searchValue}
        onChange={(value) => {
          setSearchValue(value);
          setSearchResult(value === "" ? null :
            source.filter(v => ( v[searchKey].includes(value) ? v : null ) )
          );
        }}
      />
      <PickerField
        title='欄位'
        items={fields}
        selectedValue={searchKey}
        onValueChange={ v => {
          setSearchKey(v) 
        }}
      />
    </>
  );

  const TableEntry = ({ item, fields, selected, onPress }) => {
    const fieldViews = fields.map(f => <Text key={f.name} style={styles.dataItem}>{item[f.name]}</Text>)
    return (
      <Pressable style={selected ? styles.selectedItem : styles.projectItem} onPress={onPress}>
        {fieldViews}
      </Pressable>
    )
  }

	return (
    <View>
      { showSearchBar && <SearchBar /> }
  		<FlatList
        ListHeaderComponent={ !hideHeader && Header }
        ListFooterComponent={ !hideFooter && Footer }
  			style={styles.datapoolList}
        data={ searchResult ? searchResult : source }
  			renderItem={( { item, index } ) => {
          if (index < startAt) return null;

          if (limit !== 0 && (index >= (startAt + limit))) return null;

  				return (<TableEntry
            item={item}
            fields={fields}
  					selected={item.id === selectedItem}
  					onPress={() => {
              setSelectedItem(item.id);
              onSelectItem && onSelectItem(item);
  					}}
  				/>
  			)}}
  			keyExtractor={(item) => {
  				return `${item.id}`;
        }}
        extraData={selectedItem}
  		/>
    </View>
	);
}

export default DataTable;


const styles = StyleSheet.create({
  datapoolList: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
  },
  listEntry: {
    margin: 5,
  },
  title: {
    fontSize: 18,
  },
  selectedItem: {
    flexDirection: "row",
    backgroundColor: "#777",
  },
  projectItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  dataItem: {
    margin: 5,
    flex: 1,
  },
  paginator: {
    flexDirection: "row",
    padding: 5,
  },
  currentPage: {
    backgroundColor: "#77f",
    color: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  pageIndex: {
    paddingLeft: 10,
    paddingRight: 10,
  }

});


export const withFirestore = (dataClass) => {
  return (props) => {
    const {
      orderBy,
      filter,
      filterKey,
      ...rest
    } = props;
		const [ list, setList ] = useState([]);
	
		useEffect(() => {
      if (filterKey)
        dataClass.Qualified(filter).then(result => setList(result));
      else
        dataClass.Query(orderBy).then(result => setList(result));
		}, [orderBy, filterKey, filter]);
		
		return (
			<DataTable
				source={list}
        dataClass={dataClass}
        { ...rest }
			/>
		)
	};	
}
import React, { useState } from 'react';
import { SimpleTable, SimpleTableProp, TableItemBase } from './simpleTable';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import {
  TextField,
  PickerField,
} from '../basic';

export interface PagingTableProp extends SimpleTableProp {
  paging: boolean;
  searchBar: boolean;
}

export const PagingTable = (props : PagingTableProp) => {
  const [ startAt, setStartAt ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState<number>(0);
  const [ searchResult, setSearchResult ] = useState<TableItemBase[]>([]);
  const [ searchValue, setSearchValue ] = useState(''); 
  const [ searchKey, setSearchKey ] = useState<string>('id');

  let {
    source,
    limit,
    fields,
    paging,
    searchBar,
  } = props;

  ( source || (source = []));
  let pagingSource = searchValue === '' ? source : searchResult;
  const pages = Math.floor((pagingSource.length + limit - 1) / limit);

  if (pagingSource && paging) {
    pagingSource = pagingSource.slice(startAt, startAt + limit);
  }

  const PageIndex = ({ index } : { index: number }) => (
    <Pressable onPress={() => {
      if (currentPage !== index) {
        setCurrentPage(index);
        setStartAt(index * limit);
      }
    }}>
      <Text style={currentPage === index ? styles.currentPage : styles.pageIndex}>{index + 1}</Text>
    </Pressable>
  );

  const Paginator = ({ pages } : { pages: number }) => {
    if ( limit === 0 ) return null;

    const pageIndex = [];
    for (let i = 0; i < pages; i ++) pageIndex.push(i);

    return (
      <View style={styles.paginator}>
        {pageIndex.map( value => (<PageIndex key={value} index={value} />) ) }
      </View>
    );
  }

  const searchKeyword = (value: string) => {
    setSearchValue(value);
    setSearchResult(value === "" ? source :
      source.filter(v => ( v[searchKey].includes(value) ? v : null ) )
    );
    setStartAt(0);
  }

  const SearchBar = () => (
    <View>
      <TextField
        key='pt-searchbar'
        label='搜尋'
        defaultValue={searchValue}
        onChangeText={searchKeyword}
      />
      <PickerField
        label='欄位'
        items={fields}
        selectedValue={searchKey}
        onValueChange={ v => {
          setSearchKey(v) 
        }}
      />
    </View>
  );

  return (
    <View>
      { searchBar && <SearchBar /> }
      { paging && <Paginator pages={pages} /> }
      <SimpleTable { ... props} source={pagingSource} />
      { paging && <Paginator pages={pages} /> }
    </View>
	);
}


const styles = StyleSheet.create({
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
  },
});
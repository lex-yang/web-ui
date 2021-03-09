import React, { useState } from 'react';

import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

export type TableField = {
  key: string;
  name: string;
};

export type TableItemBase = {
  id: string;
};

export interface SimpleTableProp {
  title: string;
  source: TableItemBase[];
  limit: number;
  fields: TableField[];
  hideHeader: boolean;
  hideFooter: boolean;

  onSelectItem: (item: any) => void;  
}

export const SimpleTable = ({
  title,
  source,
  limit = 0,
  fields,
  hideHeader = false,
  hideFooter = false,
  onSelectItem,
} : SimpleTableProp) => {
  const [ selectedItem, setSelectedItem ] = useState('');
  
  if (!source) return ( <ActivityIndicator size='large' /> );

  const FieldTitle = () => (
    <View style={{ flexDirection: "row" }} >
      { fields && fields.map(f => <Text key={f.key} style={styles.dataItem}>{f.name}</Text>) }
    </View>
  );
 
	const Header = () => (
    hideHeader ? null :
    <View style={styles.listEntry}>
      <Text style={styles.title}>{title}</Text>
      <FieldTitle />
    </View>
  );

  const Footer = () => (
    hideFooter ? null :
    <View style={styles.listEntry}>
      <FieldTitle />
    </View>
  );

  const TableEntry: React.FC<{
    item: any;
    fields: TableField[];
    selected: boolean;
    onPress: (item: any) => void
  }> = (props) => {
    const fieldViews = props.fields.map(f => <Text key={f.key} style={styles.dataItem}>{props.item[f.key]}</Text>)
    return (
      <Pressable style={props.selected ? styles.selectedItem : styles.projectItem} onPress={props.onPress}>
        {fieldViews}
      </Pressable>
    )
  }

  let data: TableItemBase[] = source;
  if (limit) data = data.slice(0, limit);

	return (
    <View>
  		<FlatList
        ListHeaderComponent={ Header }
        ListFooterComponent={ Footer }
        style={styles.dataList}
        data={data}
  			renderItem={( { item } ) => 
          (<TableEntry
            item={item}
            fields={fields}
  					selected={item.id === selectedItem}
  					onPress={() => {
              setSelectedItem(item.id);
              onSelectItem && onSelectItem(item);
  					}}
  				/>
  			)}

  			keyExtractor={ (item: any) => `${item.id}` }
        extraData={selectedItem}
  		/>
    </View>
	);
}

const styles = StyleSheet.create({
  dataList: {
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
});
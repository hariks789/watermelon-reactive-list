import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import {useDatabase} from '@nozbe/watermelondb/hooks';

const HomeScreen = ({ticketsObserved}) => {
  const database = useDatabase();

  useEffect(() => {
    // async function fetchData() {
    //   const ticketCollection = database.get('tickets');
    //   const allTickets = await ticketCollection.query().fetch();
    // }
    // fetchData();
  }, []);

  const handleCreateTicket = async () => {
    await database.write(async () => {
      await database.get('tickets').create(ticket => {
        ticket.name = `New Ticket ${Math.random()}`;
        ticket.number = `${Math.random()}`;
        ticket.remark = 'No remarks';
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={handleCreateTicket} title="Create random ticket" />
      <ScrollView>
        {ticketsObserved.map((ticket, index) => {
          return (
            <View style={styles.ticketBox} key={index}>
              <Text style={styles.textStyle}>Name: {ticket.name}</Text>
              <Text style={styles.textStyle}>ID: {ticket.number}</Text>
              <Text style={styles.textStyle}>Remarks</Text>
              <Text style={styles.textStyle}>{ticket.remarks}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}) => ({
    ticketsObserved: database.get('tickets').query().observe(),
  })),
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  ticketBox: {
    marginVertical: 10,
    backgroundColor: '#00796b',
    padding: 20,
    borderRadius: 10,
  },
  textStyle: {
    color: '#e3f2fd',
  },
});

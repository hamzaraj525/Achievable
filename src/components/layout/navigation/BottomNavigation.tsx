import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, IconName } from '../../ui/icon/Icon';

export const BottomNavigationIds = {
  HOME: 'HOME',
  SEARCH: 'SEARCH',
  MEDIA: 'MEDIA',
  GOALS_AND_TASKS: 'GOALS_AND_TASKS',
  PROFILE: 'PROFILE',
} as const;

export type BottomNavigationId = keyof typeof BottomNavigationIds;

const BottomNavigationIdsList = Object.keys(
  BottomNavigationIds
) as BottomNavigationId[];

type Props = {
  onNavigate: (itemId: BottomNavigationId) => void;
  activeNavItemId?: BottomNavigationId;
};

export const BottomNavigation = ({ onNavigate, activeNavItemId }: Props) => (
  <View style={styles.bottomNav}>
    {BottomNavigationIdsList.map(itemId => (
      <TouchableOpacity
        key={itemId}
        onPress={() => onNavigate(itemId)}
        style={styles.tabButton}
      >
        <Icon
          name={ItemIdToIconName[itemId]}
          isActive={activeNavItemId === itemId}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const ItemIdToIconName: Record<BottomNavigationId, IconName> = {
  [BottomNavigationIds.HOME]: 'House',
  [BottomNavigationIds.SEARCH]: 'Search',
  [BottomNavigationIds.MEDIA]: 'MediaCapture',
  [BottomNavigationIds.GOALS_AND_TASKS]: 'GoalsAndTasks',
  [BottomNavigationIds.PROFILE]: 'Profile',
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightgray', // Customize the background color
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-around', // Space items evenly
    alignItems: 'center',
    height: 60, // Set the desired height
    paddingHorizontal: 16, // Adjust padding as needed
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

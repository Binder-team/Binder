/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Messages: undefined;
  NotFound: undefined;
  Login: undefined;
  CreateAccount:undefined;
  MyPageTab:undefined;
  ConfirmExchange: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  FindBookTab: undefined;
  AddBookTab: undefined;
  MyPageTab: undefined;
  MatchTab: undefined
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;


export type Book = {
  id: number;
  user_id: number;
  book_id: string;
  is_available: boolean;
  isbn: string;
  condition: number;
  image_url: string;
  thumbnail_url: string;
  title: string;
  author: string;
}

export type matchedBooks = {
  id: number,
  user1Id : number,
  user2Id: number,
  username1: string,
  username2: string,
  book1Id: number,
  book2Id: number,
}
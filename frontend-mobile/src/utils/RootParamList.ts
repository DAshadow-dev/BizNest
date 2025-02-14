export type RootParamList = {
  HomeScreen: undefined,
  DetailsScreen: {message: string},
  AdminDashboardScreen : undefined,
  AccountListScreen : undefined,
  PendingAccountsScreen : undefined,
  AccountDetailScreen : {  id: string;
    name: string;
    status: 'Active' | 'Blocked'},
};

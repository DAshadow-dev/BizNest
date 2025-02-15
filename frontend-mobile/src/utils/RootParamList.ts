export type RootParamList = {
  HomeScreen: undefined,
  DetailsScreen: {message: string},
  ProductListScreen: undefined,
  ProductDetailScreen: {  product: {name: string;
                          price: number;
                          size: string;
                          color: string;
                          brand: string;
                          image: string;
                          category: string;} };
  CreateProductScreen: undefined,
  EditProductScreen: {  product: {name: string;
                        price: number;
                        size: string;
                        color: string;
                        brand: string;
                        image: string;
                        category: string;} };
};

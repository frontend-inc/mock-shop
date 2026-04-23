// A small but useful subset of the Shopify Storefront API. Field names and
// shapes match the real API so client queries can be reused as-is.
export const typeDefs = /* GraphQL */ `
  scalar URL
  scalar HTML
  scalar DateTime

  enum CurrencyCode {
    USD
    EUR
    GBP
    CAD
    AUD
    JPY
  }

  enum CountryCode {
    US
    CA
    GB
    DE
    FR
    JP
    AU
  }

  enum ProductCollectionSortKeys {
    TITLE
    PRICE
    BEST_SELLING
    CREATED
    MANUAL
    COLLECTION_DEFAULT
    ID
    RELEVANCE
  }

  enum ProductSortKeys {
    TITLE
    PRODUCT_TYPE
    VENDOR
    CREATED_AT
    UPDATED_AT
    BEST_SELLING
    PRICE
    ID
    RELEVANCE
  }

  enum CollectionSortKeys {
    TITLE
    UPDATED_AT
    ID
    RELEVANCE
  }

  type MoneyV2 {
    amount: String!
    currencyCode: CurrencyCode!
  }

  type Image {
    id: ID
    url: URL!
    altText: String
    width: Int
    height: Int
  }

  type SelectedOption {
    name: String!
    value: String!
  }

  type ProductOption {
    id: ID!
    name: String!
    values: [String!]!
  }

  type ProductVariant {
    id: ID!
    title: String!
    sku: String
    availableForSale: Boolean!
    quantityAvailable: Int
    price: MoneyV2!
    compareAtPrice: MoneyV2
    selectedOptions: [SelectedOption!]!
    image: Image
    product: Product!
  }

  type ProductPriceRange {
    minVariantPrice: MoneyV2!
    maxVariantPrice: MoneyV2!
  }

  type ImageEdge {
    node: Image!
    cursor: String!
  }
  type ImageConnection {
    edges: [ImageEdge!]!
    nodes: [Image!]!
    pageInfo: PageInfo!
  }

  type ProductVariantEdge {
    node: ProductVariant!
    cursor: String!
  }
  type ProductVariantConnection {
    edges: [ProductVariantEdge!]!
    nodes: [ProductVariant!]!
    pageInfo: PageInfo!
  }

  type ProductEdge {
    node: Product!
    cursor: String!
  }
  type ProductConnection {
    edges: [ProductEdge!]!
    nodes: [Product!]!
    pageInfo: PageInfo!
  }

  type CollectionEdge {
    node: Collection!
    cursor: String!
  }
  type CollectionConnection {
    edges: [CollectionEdge!]!
    nodes: [Collection!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Product {
    id: ID!
    handle: String!
    title: String!
    description: String!
    descriptionHtml: HTML!
    productType: String!
    vendor: String!
    tags: [String!]!
    availableForSale: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    publishedAt: DateTime!
    featuredImage: Image
    images(first: Int = 10): ImageConnection!
    options: [ProductOption!]!
    priceRange: ProductPriceRange!
    variants(first: Int = 100): ProductVariantConnection!
    collections(first: Int = 10): CollectionConnection!
  }

  type Collection {
    id: ID!
    handle: String!
    title: String!
    description: String!
    descriptionHtml: HTML!
    image: Image
    updatedAt: DateTime!
    products(
      first: Int = 20
      sortKey: ProductCollectionSortKeys
      reverse: Boolean
    ): ProductConnection!
  }

  type CartCost {
    subtotalAmount: MoneyV2!
    totalAmount: MoneyV2!
  }

  type CartLineCost {
    amountPerQuantity: MoneyV2!
    subtotalAmount: MoneyV2!
    totalAmount: MoneyV2!
  }

  type CartLine {
    id: ID!
    quantity: Int!
    merchandise: ProductVariant!
    cost: CartLineCost!
  }

  type CartLineEdge {
    node: CartLine!
    cursor: String!
  }
  type CartLineConnection {
    edges: [CartLineEdge!]!
    nodes: [CartLine!]!
    pageInfo: PageInfo!
  }

  type CartBuyerIdentity {
    countryCode: CountryCode
  }

  type Cart {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    totalQuantity: Int!
    lines(first: Int = 100): CartLineConnection!
    cost: CartCost!
    checkoutUrl: URL!
    buyerIdentity: CartBuyerIdentity!
  }

  type Shop {
    name: String!
    description: String
    primaryDomain: Domain!
    paymentSettings: PaymentSettings!
  }

  type Domain {
    host: String!
    url: URL!
  }

  type PaymentSettings {
    currencyCode: CurrencyCode!
    countryCode: CountryCode!
  }

  input CartInput {
    lines: [CartLineInput!]
    note: String
    buyerIdentity: CartBuyerIdentityInput
  }

  input CartLineInput {
    merchandiseId: ID!
    quantity: Int = 1
  }

  input CartLineUpdateInput {
    id: ID!
    quantity: Int
    merchandiseId: ID
  }

  input CartBuyerIdentityInput {
    countryCode: CountryCode
  }

  type UserError {
    field: [String!]
    message: String!
  }

  type CartCreatePayload {
    cart: Cart
    userErrors: [UserError!]!
  }

  type CartLinesAddPayload {
    cart: Cart
    userErrors: [UserError!]!
  }

  type CartLinesUpdatePayload {
    cart: Cart
    userErrors: [UserError!]!
  }

  type CartLinesRemovePayload {
    cart: Cart
    userErrors: [UserError!]!
  }

  type Query {
    shop: Shop!
    product(id: ID, handle: String): Product
    productByHandle(handle: String!): Product
    products(
      first: Int = 20
      sortKey: ProductSortKeys
      reverse: Boolean
      query: String
    ): ProductConnection!
    collection(id: ID, handle: String): Collection
    collectionByHandle(handle: String!): Collection
    collections(
      first: Int = 20
      sortKey: CollectionSortKeys
      reverse: Boolean
    ): CollectionConnection!
    cart(id: ID!): Cart
    node(id: ID!): Node
  }

  union Node = Product | ProductVariant | Collection | Cart

  type Mutation {
    cartCreate(input: CartInput): CartCreatePayload!
    cartLinesAdd(cartId: ID!, lines: [CartLineInput!]!): CartLinesAddPayload!
    cartLinesUpdate(cartId: ID!, lines: [CartLineUpdateInput!]!): CartLinesUpdatePayload!
    cartLinesRemove(cartId: ID!, lineIds: [ID!]!): CartLinesRemovePayload!
  }
`;

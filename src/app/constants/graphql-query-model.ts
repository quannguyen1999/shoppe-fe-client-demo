// COMMON
export const commonResponseField: string = `
  {
    page,
    size,
    total,
    data{
      $fields
    }
  }
`;

export const commonRequestField: string = `
  $id: String,
  $page: Int!,
  $size: Int!,
  $createFromDate: String,
  $createToDate: String,
  $listSorted: [Map],
`;

export const commonRequestMapField: string = `
  id: $id,
  page: $page,
  size: $size,
  createFromDate: $createFromDate,
  createToDate: $createToDate,
  listSorted: $listSorted,
`;


// ACCOUNT
export const getAccountDetail: string = `
query AccountDetail(
  ` + commonRequestField + `
  $username: String,
  $fromBirthday: String,
  $toBirthday: String,
  $isActive: Boolean,
  $gender: Boolean,
  $email: String
  ) {
  listAccount(
      accountRequestDto: {
          ` + commonRequestMapField + `
          username: $username,
          fromBirthday: $fromBirthday,
          toBirthday: $toBirthday,
          isActive: $isActive,
          gender: $gender,
          email: $email
      }
  )` + commonResponseField + `
}
`;

//CATEGORY
export const getCategoryDetail: string = `
query CategoryDetail(
  ` + commonRequestField + `
  $name: String,
  ) {
  listCategory(
      categoryRequestDto: {
        ` + commonRequestMapField + `
          name: $name
      }
  )` + commonResponseField + `
}
`;

//PRODUCT
export const getProductDetail: string = `
query ProductDetail(
  ` + commonRequestField + `
  $name: String
  ) {
  listProduct(
      productRequestDto: {
        ` + commonRequestMapField + `
          name: $name
      }
  )` + commonResponseField + `
}
`;

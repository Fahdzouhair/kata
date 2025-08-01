using {my.Kata as my} from '../db/schema';

service CatalogService {
  @Capabilities: {
    Insertable: false,
    Updatable : false,
    Deletable : false,
  }
  entity PurchaseHistories as projection on my.PurchaseHistory;

      @(requires: 'authenticated-user')
      @Capabilities: {
    Updatable: false,
    Deletable: false,
  }
      @(restrict: [
    {
      grant: 'READ',
      to   : ['Seller','Buyer']
    },
    {
      grant: 'WRITE',
      to   : 'Seller'
    },
    {
      grant: 'buyBook',
      to   : 'Buyer'
    }
  ])
  entity Books             as projection on my.Book
    actions {
      action buyBook() returns PurchaseHistories;
    };


}

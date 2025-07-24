using { cuid } from '@sap/cds/common';

namespace my.Kata;

entity Book:cuid{
    title  : String;
    author : String;
}

import { Container } from "inversify";
import { BooksRepository } from "./entities/BooksRepository";

const myContainer = new Container();
myContainer.bind(BooksRepository).toSelf() 
import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

@Injectable()
export class ProductsService {
    constructor(
        @Inject("DATABASE_CONNECTION") 
        private readonly database: NodePgDatabase<typeof schema>
    ) {}

    async createProduct(
        product: Omit<typeof schema.products.$inferInsert, "id">
    ) {
        await this.database.insert(schema.products).values({
            ...product,
        });
    }
}
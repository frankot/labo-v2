# Hygraph API Testing Playground

This document provides GraphQL queries that have been confirmed to work with your Hygraph CMS. You can use these in the Hygraph API Explorer to test your queries.

## Working Minimal Query

This query has been confirmed to work in your debug page:

```graphql
query GetRealizacjasForGridMinimal {
  realizacjas(orderBy: createdAt_DESC) {
    id
    title
    client
    slug
    services
    image {
      url
    }
    video {
      url
    }
  }
}
```

## Debugging Tips

1. **Start Simple**: Begin with the minimal working query above
2. **Add Fields Gradually**: Add one field at a time to see which one causes the failure
3. **Check Field Names**: Make sure all field names match exactly what's in Hygraph
4. **Verify Data Types**: Ensure the fields you're requesting match the expected types

## Common Issues

1. **Field doesn't exist**: If a field you're querying doesn't exist in the schema
2. **Field type mismatch**: If you're querying a field as an object but it's a scalar type
3. **Order by issue**: If the field used in orderBy doesn't support sorting
4. **Authentication**: If your API key doesn't have permission to access certain fields

## Using the Hygraph API Explorer

1. Go to your Hygraph dashboard
2. Navigate to the API Playground/Explorer
3. Paste in the working query from above
4. Test it with the Play button
5. Gradually add more fields to see where it breaks

## Making Changes to Your Schema

If you need to add or modify fields:
1. Go to your Hygraph Schema section
2. Find the "Realizacja" model
3. Add or modify fields as needed
4. Publish your changes
5. Test with the minimal query first

Remember that any schema changes may require migration of existing content.

import React, { useEffect, useState } from "react";

import { RefreshIcon } from "@sanity/icons";
import { useSecrets } from "@sanity/studio-secrets";
import { Box, Button, Card, Select, Text } from "@sanity/ui";
import { StringInputProps, set, unset } from "sanity";

export function ProductSelector(props: StringInputProps) {
  const { secrets } = useSecrets<{
    polarAccessTokenProducts: string;
  }>("secrets");

  // The onChange handler can write new changes to the field
  const { onChange, value } = props;

  const handleChange = React.useCallback(
    (event: React.FormEvent<HTMLSelectElement> | undefined) => {
      const value = event?.currentTarget.value;
      onChange(value ? set(value) : unset());
    },
    [onChange],
  );

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = () => {
    if (!secrets?.polarAccessTokenProducts) {
      setError("Failed to find access token");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch("https://api.polar.sh/v1/products/?limit=100", {
      method: "GET",
      headers: { Authorization: `Bearer ${secrets.polarAccessTokenProducts}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((response) => {
        setProducts(response.items || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!secrets) return;
    fetchProducts();
  }, [secrets?.polarAccessTokenProducts]);

  if (isLoading) {
    return <Text>Loading products...</Text>;
  }

  if (error) {
    return (
      <Card padding={2} tone="critical">
        <Box marginBottom={2}>
          <Text>{error}</Text>
        </Box>
        <Button
          icon={RefreshIcon}
          text="Refresh"
          tone="primary"
          onClick={fetchProducts}
        />
      </Card>
    );
  }

  if (!products.length) {
    return (
      <Card padding={2} tone="caution">
        <Text>No products found</Text>
      </Card>
    );
  }

  return (
    <>
      <Select onChange={handleChange} value={value}>
        <option value={""}>None</option>
        {products.map(
          (item: {
            prices: Array<Partial<{ priceAmount: number }>>;
            id: string;
            name: string;
          }) => {
            const price = (item.prices?.[0] as any)?.priceAmount;
            return (
              <option key={item.id} value={item.id}>
                {item.name} {price ? `($${price})` : ""}
              </option>
            );
          },
        )}
      </Select>
    </>
  );
}

import { useState } from "react"
import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react";
import { useProductStore } from "../store/product";

export default function CreatePage() {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const { createProduct } = useProductStore();
  const toast = useToast();
  async function handleSubmit() {
    const { success, message } = await createProduct(newProduct);
    console.log(success, message);
    if (!success) {
        toast({
          "title": "Error",
          description: message,
          status: "error",
          isClosable: true
        })
    } else {
      toast({
          "title": "Success",
          description: message,
          status: "success",
          isClosable: true
        })
    }
    setNewProduct({name: "", price: "", image: ""});
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name..."
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Product Price..."
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Product image..."
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button onClick={handleSubmit} w="full" colorScheme="blue">Submit</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

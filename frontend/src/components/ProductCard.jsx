import { Box, Image, Heading, Text, HStack, IconButton, Button, Input, ModalFooter, useColorModeValue, ModalBody, useToast, Modal, ModalCloseButton, ModalHeader, useDisclosure, ModalOverlay, ModalContent, VStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import {useState} from "react";

export default function ProductCard({ product }) {

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    // MODAL STATES
    const { isOpen, onOpen, onClose } = useDisclosure()

    // DELETE PRODUCT
    const { deleteProduct } = useProductStore();
    const toast = useToast();
    async function handleDelete(id) {
        const { success, message } = await deleteProduct(id);
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
    }

    const { updateProduct } = useProductStore();
    async function handleUpdate(id, updatedProduct) {
        const { success, message } = await updateProduct(id, updatedProduct);
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
        onClose();
    }

    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
            bg={bg}
        >
            <Image src={product.image} alit={product.name} h={48} w="full" objectFit={"cover"} />
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product._id} {product.name}
                </Heading>
                <Text fontWeight="bold" fontSize={"xl"} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(product._id)} colorScheme="red" />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            Update Product
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                <Input placeholder="Product name" name="name" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                                <Input placeholder="Product price" name="price" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                                <Input placeholder="Product image" name="image" value={updatedProduct.image} onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>Update</Button>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </Box>
    )
}
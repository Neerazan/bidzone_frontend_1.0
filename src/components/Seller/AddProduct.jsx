import React, { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { RTE, Input, Button, Select } from "../index"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { useMutation } from "react-query"

function AddProduct({ product }) {
    const accessKey = useSelector((state) => state.auth.accessKey)
    const user = useSelector((state) => state.auth.userData)
    const collections = useSelector((state) => state.collection.collections)
    const navigate = useNavigate()

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            value = value.replace(/^[^a-zA-Z]+/, "")
            return value.toLowerCase().replace(/\s+/g, "-")
        }
        return ""
    }, [])

    const mutation = useMutation(
        async ({ formData }) => {
            const response = await axios.post(
                `http://127.0.0.1:8000/auction/customers/${user.id}/products/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `JWT ${accessKey}`,
                    },
                }
            )
            console.log(`Product added successfully: ${response.data}`);
            return response.data
        },
        {
            onSuccess: (response, { formData }) => {
                console.log("Product added successfully inside on success");
                if (formData.get("image")) {
                    const productId = response.id
                    imageMutation.mutate({
                        images: formData.getAll("image"),
                        productId,
                    })
                } else {
                    // navigate("/seller/products")
                    console.log("product added successfully");
                }
            },
            onError: (error) => {
                console.log(error)
            },
        }
    )

    const imageMutation = useMutation(async ({ images, productId }) => {
        console.log("Inside image mutation");
        const formDataArray = Array.from(images); // Convert FileList to array
        const promises = formDataArray.map(async (img) => {
            try {
                const formData = new FormData();
                formData.append("image", img);
                await axios.post(
                    `http://localhost:8000/auction/customers/${user.id}/products/${productId}/images/`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `JWT ${accessKey}`,
                        },
                    }
                );
                // console.log("Image uploaded successfully");
            } catch (error) {
                console.log(error);
            }
        });
        await Promise.all(promises);
        // navigate("/seller/products");
    });
    

    const { register, handleSubmit, setValue, control, getValues, watch } =
        useForm({
            defaultValues: {
                title: product?.title || "",
                description: product?.description || "",
                slug: product?.slug || "",
                price: product?.price || "",
                collection: product?.collection || "",
                images: product?.images || [],
            },
        })

    useEffect(() => {
        const unsubscribe = watch("title", (value) => {
            setValue("slug", slugTransform(value), {
                shouldValidate: true,
            })
        })

        // Ensure that unsubscribe is a function before attempting to call it
        if (typeof unsubscribe === "function") {
            return () => unsubscribe()
        }

        // If unsubscribe is not a function, return a no-op function
        return () => {}
    }, [watch, slugTransform, setValue])

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("slug", data.slug)
        formData.append("price", data.price)
        formData.append("collection", data.collection)
        console.log(`Image: ${data.image}`)
        console.log(`Image Array: ${Array.isArray(data.image)}`)

        if (data.image instanceof FileList) {
            // Check if it's a FileList object
            const imageArray = Array.from(data.image) // Convert FileList to array
            imageArray.forEach((img) => {
                formData.append("image", img)
            })
        } else if (data.image) {
            // If it's not a FileList but defined, treat it as a single image
            formData.append("image", data.image)
        }

        mutation.mutate({ formData })
    }

    return (
        <form className="flex flex-wrap h-[90vh]" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4 rounded-sm border border-gray-300"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="mb-4 border border-gray-300 rounded-sm"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }}
                />

                <Input
                    label="Price"
                    placeholder="Price"
                    type="number"
                    className="mb-4 rounded-sm border border-gray-300"
                    {...register("price", { required: true })}
                />

                <RTE
                    label="Description"
                    name="content"
                    control={control}
                    defaultValue={getValues("description")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    multiple={true}
                    {...register("image", { required: !product })}
                />
                {product && (
                    <div className="w-full mb-4">
                        <img
                            src={product.featuredImage} // You need to provide the correct source for the image here
                            alt={product.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={collections}
                    label="Category"
                    className="mb-4"
                    {...register("collection", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={product ? "bg-green-500" : undefined}
                    className="w-full rounded-sm py-1 font-semibold hover:bg-green-700 bg-green-600"
                >
                    {product ? "Update" : "Save"}
                </Button>
            </div>
        </form>
    )
}

export default AddProduct

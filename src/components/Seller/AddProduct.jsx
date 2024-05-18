import React, { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { RTE, Input, Button, Select } from "../index"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useMutation } from "react-query"
import { fetchCollections } from "../../store/common/collectionSlice"
import { useNavigate, useParams } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"
import { editProducts } from "../../store/productSlice"


function AddProduct() {
    const dispatch = useDispatch()
    const accessKey = useSelector((state) => state.auth.accessKey)
    const user = useSelector((state) => state.auth.userData)
    const collections = useSelector((state) => state.collection.collections)
    const navigate = useNavigate()
    const { slug } = useParams()

    const product = useSelector((state) =>
        state.product.products.results.find((product) => product.slug === slug)
    )

    useEffect(() => {
        if (!collections || collections.length === 0) {
            dispatch(fetchCollections())
        }
    }, [collections, dispatch])

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            value = value.replace(/^[^a-zA-Z]+/, "")
            return value.toLowerCase().replace(/\s+/g, "-")
        }
        return ""
    }, [])

    const mutation = useMutation(
        async ({ formData, isUpdate }) => {
            const url = isUpdate
                ? `http://127.0.0.1:8000/auction/customers/${user.id}/products/${product.id}/`
                : `http://127.0.0.1:8000/auction/customers/${user.id}/products/`
            const method = isUpdate ? "put" : "post"
            const response = await axios[method](url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `JWT ${accessKey}`,
                },
            })
            return response.data
        },
        {
            onSuccess: (response, { formData, isUpdate }) => {
                if (formData.get("image")) {
                    const productId = response.id
                    imageMutation.mutate(
                        {
                            images: formData.getAll("image"),
                            productId,
                        },
                        {
                            onSuccess: () => {
                                if (!isUpdate) {
                                    reset()
                                }
                            },
                        }
                    )
                } else {
                    if (!isUpdate) {
                        reset()
                    }
                }
            },
            onError: (error) => {
                console.log(error)
            },
        }
    )

    const deleteImageMutation = useMutation(async ({ imageId }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/auction/customers/${user.id}/products/${product.id}/images/${imageId}/`,
                {
                    headers: {
                        Authorization: `JWT ${accessKey}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            console.log(error)
        }
    })

    const imageMutation = useMutation(async ({ images, productId }) => {
        const formDataArray = Array.from(images) // Convert FileList to array
        const promises = formDataArray.map(async (img) => {
            try {
                const formData = new FormData()
                formData.append("image", img)
                await axios.post(
                    `http://localhost:8000/auction/customers/${user.id}/products/${productId}/images/`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `JWT ${accessKey}`,
                        },
                    }
                )
            } catch (error) {
                console.log(error)
            }
        })
        await Promise.all(promises)
    })

    const {
        register,
        handleSubmit,
        setValue,
        control,
        getValues,
        watch,
        reset,
    } = useForm({
        defaultValues: {
            title: product?.title || "",
            description: product?.description || "",
            slug: product?.slug || "",
            price: product?.price || "",
            collection: product?.collection.id || "",
            images: product?.images || [],
        },
    })

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                })
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    const onSubmit = (data) => {
        console.log(`Inslide on submit function`)
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("slug", data.slug)
        formData.append("price", data.price)
        formData.append("collection_id", data.collection_id)

        if (data.image instanceof FileList) {
            const imageArray = Array.from(data.image) // Convert FileList to array
            imageArray.forEach((img) => {
                formData.append("image", img)
            })
        } else if (data.image) {
            formData.append("image", data.image)
        }

        mutation.mutate({ formData, isUpdate: !!product })
    }

    const handleImageDelete = (imageId) => {
        try {
            deleteImageMutation.mutate(
                {
                    imageId,
                },
                {
                    onSuccess: () => {
                        const updatedImages = product.images.filter(
                            (image) => image.id !== imageId
                        )
                        const updatedProduct = {
                            ...product,
                            images: updatedImages,
                        }
                        dispatch(editProducts(updatedProduct))
                    },
                }
            )
        } catch (error) {
            console.log(`Error deleting image: ${error}`)
        }
    }

    return (
        <form
            className="flex flex-wrap h-[90vh]"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4 rounded-sm border border-gray-300 focus:outline-none focus:border-blue-600"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="mb-4 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-600"
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
                    className="mb-4 rounded-sm border border-gray-300 focus:outline-none focus:border-blue-600"
                    {...register("price", { required: true })}
                />
                <RTE
                    label="Description"
                    name="description"
                    control={control}
                    defaultValue={getValues("description")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    alt="Featured Image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    multiple={true}
                    {...register("image", { required: !product })}
                />
                {product && (
                    <div className="flex h-auto justify-center items-start gap-1 p-2">
                        {product.images.map((image) => (
                            <div
                                key={image.id}
                                className="h-auto flex justify-center items-center relative"
                            >
                                <div>
                                    <button
                                        type="button"
                                        className="text-white font-semibold absolute p-0.5 rounded-full bg-red-600 border-none -right-1 -top-2"
                                        onClick={() => {
                                            handleImageDelete(image.id)
                                        }}
                                    >
                                        <RxCross2 />
                                    </button>
                                </div>
                                <img
                                    src={`http://127.0.0.1:8000/${image.image}/`}
                                    alt={product.title}
                                    className="h-24 w-24 object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                )}
                <Select
                    value={product ? product.collection.id : ""}
                    options={collections}
                    label="Category"
                    className="mb-4"
                    {...register("collection_id", { required: true })}
                />
                <Button
                    className="w-full rounded-sm py-1 font-semibold hover:bg-green-700 bg-green-600"
                >
                    {product ? "Update" : "Save"}
                </Button>
            </div>
        </form>
    )
}

export default AddProduct

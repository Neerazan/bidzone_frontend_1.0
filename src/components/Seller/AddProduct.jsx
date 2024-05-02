import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RTE, Input, Button, Select } from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useQuery } from 'react-query'



function AddProduct({ product }) {

    const accessKey = useSelector((state) => state.auth.accessKey)
    const user = useSelector((state) => state.auth.userData)     

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: product?.title || "",
            description: product?.description || "",
            slug: product?.slug || "",
            price: product?.price || "",
            collection: product?.collection || "",
            images: product?.images || [],
        }
    })

    const navigate = useNavigate();
    const collections = useSelector((state) => state.collection.collections);


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            value = value.replace(/^[^a-zA-Z]+/, '');
            return value.toLowerCase().replace(/\s+/g, "-")
    }

        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            setValue("slug", slugTransform(value.title, {
                shouldValidate: true,
            }))
        })

        return () => subscription.unsubscribe()
        
    }, [watch, slugTransform, setValue])



    const submit = async (data) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("slug", data.slug)
        formData.append("price", data.price)
        formData.append("collection", data.collection)

        try {
            const response = await axios.post(`http://127.0.0.1:8000/auction/customers/${user.id}/products/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `JWT ${accessKey}`
                }
            })

            if (response.status === 201) {
                // navigate("/seller/products")
                console.log("Product added successfully.");
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form className="flex flex-wrap" onSubmit={handleSubmit(submit)}>
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
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <Input
                    label="Price"
                    placeholder="Price"
                    type="number"
                    className="mb-4 rounded-sm border border-gray-300"
                    {...register("price", { required: true })}
                />

                <RTE label="Description" name="content" control={control} defaultValue={getValues("description")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !product })}
                />
                {product && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(product.featuredImage)}
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
                <Button type="submit" bgColor={product ? "bg-green-500" : undefined} className="w-full rounded-sm py-1 font-semibold hover:bg-green-700 bg-green-600">
                    {product ? "Update" : "save"}
                </Button>
                {/* {
                    product ? "" : (<Button className='w-full rounded-sm py-1 font-semibold bg-cyan-600 hover:bg-cyan-700 mt-2' children="save and add another"/>)
                } */}
            </div>
        </form>
    )
}

export default AddProduct
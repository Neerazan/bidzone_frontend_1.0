import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RTE, Input, Button, Select } from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function AddProduct({ product }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: product?.title || "",
            description: product?.description || "",
            slug: product?.slug || "",
            price: product?.price || 0,
            collection: product?.collection || "",
            images: product?.images || [],
        }
    })

    const navigate = useNavigate()
    const user = useSelector(state => state.userData)


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
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

    return (
        <form className="flex flex-wrap">
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
                    options={["Electronics", "Clothing"]}
                    label="Category"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={product ? "bg-green-500" : undefined} className="w-full rounded-sm py-1 font-semibold hover:bg-blue-700">
                    {product ? "Update" : "save"}
                </Button>
                {
                    product ? "" : (<Button className='w-full rounded-sm py-1 font-semibold bg-cyan-600 hover:bg-cyan-700 mt-2' children="save and add another"/>)
                }
            </div>
        </form>
    )
}

export default AddProduct
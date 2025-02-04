"use client";
import React, { useState } from "react";
import { IoSearchOutline, IoShareSocialOutline } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";
import TodoListItem from "./TodoListItem";
import TodoListItemReadOnly from "./TodoListItemReadOnly";

const Todolist = ({
    shardUserFullName = "",
    ownerUserId = "",
    loading = false,
    todoListData = [],
    isReadOnly = false,
    onCreate = () => {},
    onUpdate = (id, updateContent) => {},
    onDelete = (id) => {},
    onSearch = (terms) => {},
}) => {
    const [copiedText, copy] = useCopyToClipboard();
    const [searchText, setSearchText] = useState("");
    // 공유하기
    const handleCopy = () => {
        const shareLink = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/share/${ownerUserId}`;
        copy(shareLink)
            .then(() => {
                window.alert(`shareLink : \n${shareLink}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearchEnd = (terms) => {
        onSearch(terms);
        setSearchText("");
    };
    return (
        <section className="min-h-[100vh] bg-[#d9c1ff]">
            <div className="w-full max-w-[800px] p-[20px] mx-auto">
                <article className="flex justify-between flex-row items-center">
                    <div className="font-bold text-[32px]">
                        {shardUserFullName && <div>{shardUserFullName}</div>}
                        Things to do :
                    </div>
                    <div
                        onClick={() => handleCopy()}
                        className="flex flex-row font-bold text-[20px] items-center cursor-pointer">
                        share
                        <IoShareSocialOutline />
                    </div>
                </article>
                {!isReadOnly && (
                    <article className="flex flex-col gap-4 mt-8 sm:flex-row">
                        <div className="flex flex-1 h-[60px]">
                            <input
                                className="
                                    p-4
                                    flex-1
                                    bg-[#E7CB66]
                                    border border-black rounded-l-2xl font-bold
                                "
                                type="text"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        handleSearchEnd(e.target.value);
                                    }
                                }}
                            />
                            <div
                                className="
                                    w-[60px] flex justify-center 
                                    items-center bg-black rounded-r-2xl 
                                    cursor-pointer
                                "
                                onClick={() => {
                                    handleSearchEnd(searchText);
                                }}>
                                <IoSearchOutline size={40} color="#fff" />
                            </div>
                        </div>
                        <div
                            className="
                                h-[60px] w-[200px] 
                                flex justify-center items-center bg-[#7EBB95] 
                                border border-black rounded-2xl font-bold 
                                cursor-pointer text-[20px]
                            "
                            onClick={onCreate}>
                            추가하기
                        </div>
                    </article>
                )}

                <div className="h-[2px] bg-black w-full mt-4 mb-4"></div>

                {todoListData?.length >= 1 ? (
                    <ul className="flex flex-col gap-6">
                        {(todoListData ?? []).map((todo) => {
                            if (isReadOnly) {
                                return (
                                    <TodoListItemReadOnly
                                        key={todo?.id}
                                        todo={todo}
                                    />
                                );
                            } else {
                                return (
                                    <TodoListItem
                                        key={todo?.id}
                                        todo={todo}
                                        onUpdate={onUpdate}
                                        onDelete={onDelete}
                                    />
                                );
                            }
                        })}
                    </ul>
                ) : (
                    <div>{loading ? "Loading..." : "데이터가 없습니다"}</div>
                )}
            </div>
        </section>
    );
};

export default Todolist;

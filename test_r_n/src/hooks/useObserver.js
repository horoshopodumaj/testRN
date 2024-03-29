import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isLoading, callback, stopScroll) => {
    // для хранения нового экземпляра IntersectionObserver
    const observer = useRef(null);

    useEffect(() => {
        if (isLoading) return;
        //прерываем выполнение, если не найден lastElement
        if (!ref.current) return;
        //прерываем выполнение, текущая страница больше или равна pageScrollLimit
        if (stopScroll) return;
        //отключаем наблюдение, чтобы создать новый observer
        if (observer.current) observer.current.disconnect();
        //когда lastElement в зоне видимости, то срабатывает callback
        let cb = function (entries, observer) {
            //проверяем в зоне видимости lastElement или нет
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        };

        observer.current = new IntersectionObserver(cb);
        //указываем за каким элементом следить
        observer.current.observe(ref.current);
        // eslint-disable-next-line
    }, [isLoading]);
};

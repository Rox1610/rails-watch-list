Rails.application.routes.draw do
  root to: "lists#index"
  resources :lists, except: :index do
    resources :bookmarks, only: %i[create new]
  end
  resources :bookmarks, only: %i[destroy]
end

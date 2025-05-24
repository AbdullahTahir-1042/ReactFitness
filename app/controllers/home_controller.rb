class HomeController < ApplicationController
  skip_before_action :require_user, only: [:index]
  
  def index
    render html: '', layout: 'application'
  end
end 